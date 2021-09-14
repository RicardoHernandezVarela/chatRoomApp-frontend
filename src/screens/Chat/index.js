import React from 'react';
import { useParams } from 'react-router-dom';

/* Import Consumer from Context */
import { UserContext } from '../../context';

/* IMPORT COMPONENTS */
import Header from '../../components/Header';
import MessagesList from '../../components/MessagesList';
import MessageInput from '../../components/MessageInput';

function Chat(props) {
  const { socket } = props;
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const { setHideSidebar } = userContext.actions;

  const { room_id, room_name } = useParams();

  const msgInitialValue = '';
  const [message, setMessage] = React.useState(msgInitialValue);
  const [msgsList, setMsgsList] = React.useState([]);

  // ADD USER TO THE CHATROOM
  React.useEffect(() => {
    try {
      // JOIN USER TO CHAT
      socket.emit('join-user-to-chat', {name: user.name, room_id, user_id: user._id});
  
      // GET ALL CHATROOM MESSAGES
      socket.on('all-chatroom-messages', (allmessages) => {
        setMsgsList([...msgsList, ...allmessages]);
      });  
    } catch (error) {
      console.log(error);
    }
  }, []);

  // RECIVE NEW MESSAGES
  React.useEffect(() => {
    try {
      socket.on('new-message', (newMessage) => {
        setMsgsList([...msgsList, newMessage]);
      });
    } catch (error) {
      console.log(error);
    }
  }, [msgsList]);

  // SEND MESSAGE
  const sendMessage = (event) => {
    event.preventDefault();
    const msgToSend = message.trim();

    if (msgToSend !== '') {
      console.log(msgToSend);
      socket.emit('message-sent', {room_id, message: msgToSend});
      setMessage(msgInitialValue);
    }
  };

  return (
    <div className="block bg-gray-200 w-screen md:w-4/5 h-screen m-0 p-0" onClick={(event) => setHideSidebar(event.target)}>
      <Header />

      <div className="block m-auto mt-16 md:mt-20 bg-transparent overflow-hidden">
        {user && (
          <MessagesList msgsList={msgsList} user={user} />
        )}

        <MessageInput sendMessage={sendMessage} setMessage={setMessage} message={message} />
      </div>  
    </div>
  );
}

export default Chat;