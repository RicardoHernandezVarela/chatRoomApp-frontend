import React from 'react';
import { useParams } from 'react-router-dom';

/* Import Consumer from Context */
import { UserContext } from '../../context';

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
    <div className="bg-gray-200 pt-16">
      <h1>{`CHAT ROOM: ${room_id} ${room_name}`}</h1>
      
      <div>
        <form onSubmit={(event) => sendMessage(event)}>
          <input value={message} onChange={(event) => setMessage(event.target.value)} />
          <button>Send Message</button>
        </form>
      </div>

      <pre>{JSON.stringify(msgsList, null, '\t')}</pre>
    </div>
  );
}

export default Chat;