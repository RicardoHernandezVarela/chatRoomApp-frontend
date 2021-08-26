import React from 'react';
import { useParams } from 'react-router-dom';

/* Import Consumer from Context */
import { UserContext } from '../../context';

import MessagesList from '../../components/MessagesList';
import MessageInput from '../../components/MessageInput';

function Chat(props) {
  const { socket } = props;
  const userContext = React.useContext(UserContext);
  const { user } = userContext;

  const { room_id, room_name } = useParams();

  const msgInitialValue = '';
  const [message, setMessage] = React.useState(msgInitialValue);
  const [msgsList, setMsgsList] = React.useState([]);

  // ADD USER TO THE CHATROOM
  React.useEffect(() => {
    //console.log('chat loaded');
    socket.emit('join-user-to-chat', {name: user.name, room_id, user_id: user.id});

    // GET ALL CHATROOM MESSAGES
    socket.on('all-chatroom-messages', (allmessages) => {
      setMsgsList([...msgsList, ...allmessages]);
    });
  }, []);

  // RECIVE NEW MESSAGES
  React.useEffect(() => {
    //console.log('new message recived');
    socket.on('new-message', (newMessage) => {
      setMsgsList([...msgsList, newMessage]);
    });
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
    <div className="bg-gray-200 pt-16 block md:grid md:grid-cols-4">
      <div className="block m-auto w-3/4 md:col-start-1">
        <h5>{`CHAT ROOM: ${user.name} ${room_name}`}</h5>
      </div>

      <div className="block m-auto w-3/4 mt-8 md:col-start-2 md:col-span-3 bg-gray-300 rounded border border-gray-800 shadow-md overflow-hidden">
        <MessagesList msgsList={msgsList} user={user} />

        <MessageInput sendMessage={sendMessage} setMessage={setMessage} message={message} />
      </div>    
    </div>
  );
}

export default Chat;