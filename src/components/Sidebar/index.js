import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../../Routes';

/* COMPONENTS */
import ChatRoomsList from '../ChatRoomsList';

/* CONTEXT */
import { UserContext } from '../../context';

function Sidebar({ socket }) {
  const userContext = React.useContext(UserContext);
  const { user, chatRooms } = userContext;

  return (
    <div className="w-1/5 h-screen bg-blue-600 border-r border-gray-400 z-10 shadow-xl">
      <div className="h-12 border-b border-gray-400 flex justify-center items-center">
        <NavLink to={Routes.HOME}>
          <h6 className="text-lg text-white font-bold uppercase">Chatroom</h6>
        </NavLink>
      </div>

      <div className="mt-5">
        <ChatRoomsList chatRooms={chatRooms} socketConnected={socket.connected} />
      </div>
    </div>
  );
}

export default Sidebar;
