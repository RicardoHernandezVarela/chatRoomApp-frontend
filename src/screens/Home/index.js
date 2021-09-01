import React from 'react';

/* Import context Consumer */
import { UserContext } from '../../context';

/* Import components */
import ChatRoomsList from '../../components/ChatRoomsList';
import AddChatRoomForm from '../../components/AddChatRoomForm';

/* Test user data */
const users = [
  {
    name: 'April',
    email: 'april@example.com',
    password: '123',
    id: 'a123',
  },
  {
    name: 'Monic',
    email: 'moni@example.com',
    password: '456',
    id: 'm456',
  }
];

function Home(props) {
  const { socket } = props; 
  const userContext = React.useContext(UserContext);
  const { user, chatRooms } = userContext;
  const { setUser, setChatRooms } = userContext.actions;

  // GET CHATROOMS FROM DB
  React.useEffect(() => {
    try {
      socket.on('all-chatrooms', (allChatRooms) => {
        setChatRooms([...chatRooms, ...allChatRooms]);
      });
    } catch (error) {
      console.log('SOCKET IS NULL');
    }
  }, [socket]);

  // GET NEW CHATROOM AND ADD IT TO THE CHATROOMS LIST
  React.useEffect(() => {
    try {
      socket.on('chatroom-created', (chatRoom) => {
        setChatRooms([...chatRooms, chatRoom]);
      });
    } catch (error) {
      console.log('NO ROOM FETCHED');
    }
  }, [chatRooms]);

  // ADD NEW CHATROOM
  const addNewChatRoom = (newRoom) => {
    socket.emit('create-room', newRoom);
  };

  return (
    <div className="block md:grid md:grid-cols-2 bg-gray-200 pt-16">
      <div className="md:col-start-1">
        <h1 className="text-center mt-3 mb-3 font-bold text-green-600">{`Hello ${user ? user.name : 'User'}`}</h1>

        <AddChatRoomForm addNewChatRoom={addNewChatRoom} />

        <button className="block m-auto mt-3 p-1 border-2 rounded bg-green-500 text-white" onClick={() => setUser(users[0])}>Set first user</button>
        <button className="block m-auto p-1 border-2 rounded bg-green-500 text-white" onClick={() => setUser(users[1])}>Set second user</button>
      </div>

      <div className="md:col-start-2">
        <ChatRoomsList chatRooms={chatRooms} socketConnected={socket.connected} />
      </div>
    </div>
  );
}

export default Home;
