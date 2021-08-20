import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

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

const initialRooms = [
  {
    name: 'April',
    _id: 'a123',
  },
  {
    name: 'Monic',
    _id: 'm456',
  }
];

function Home(props) {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const { setUser } = userContext.actions;
  const [chatRooms, setChatRooms] = React.useState(initialRooms);

  const addNewChatRoom = (newRoom) => {
    setChatRooms([...chatRooms, newRoom]);
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
        <ChatRoomsList chatRooms={chatRooms} />
        <NavLink className="border-2 rounded block w-1/2 mt-1 ml-auto mr-auto text-center bg-gray-400" exact to={routes.CHAT}>Go to Chat</NavLink>
      </div>
    </div>
  );
}

export default Home;
