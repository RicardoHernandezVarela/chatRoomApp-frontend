import React from 'react';

/* Import context Consumer */
import { UserContext } from '../../context';

import { verifyUser } from '../../API/auth';

/* Import components */
import Header from '../../components/Header';
import ChatRoomsList from '../../components/ChatRoomsList';
import AddChatRoomForm from '../../components/AddChatRoomForm';

function Home(props) {
  const { socket } = props; 
  const userContext = React.useContext(UserContext);
  const { user, chatRooms } = userContext;
  const { setUser, setChatRooms, setHideSidebar } = userContext.actions;

  const tryToVerifyUser = async () => {
    const response = await verifyUser();

    if (response && response.user) {
      // SET USER AFTER VALIDATED
      setUser(response.user);
    } else {
      console.log('ERROR VERIFYING USER', response);
    }
  }

  // COMPONENTDIDMOUNT
  React.useEffect(() => {
    // VERIFY USER
    tryToVerifyUser();
  }, []);

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
    <div className="block bg-gray-200 w-screen md:w-4/5 h-screen m-0 p-0" onClick={(event) => setHideSidebar(event.target)}>
      <Header />

      <div className="block md:grid md:grid-cols-2 pt-12">
        <div className="md:col-start-1">
          <h1 className="text-center mt-3 mb-3 font-bold text-green-600">{`Hello ${user ? user.name : 'User'}`}</h1>

          <AddChatRoomForm addNewChatRoom={addNewChatRoom} />
        </div>

        <div className="md:col-start-2">
          <ChatRoomsList chatRooms={chatRooms} socketConnected={socket.connected} />
        </div>
      </div>
    </div>
  );
}

export default Home;
