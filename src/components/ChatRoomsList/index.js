import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

function ChatRoomsList(props) {
  const {chatRooms} = props;

  return (
    <div className="mt-4 mb-2">
      {chatRooms.length > 0 && (
        chatRooms.map((item, index) => {
          return (
            <ChatRoom key={item._id} item={{...item, index}} />
          );
        })
      )}

      {chatRooms.length === 0 && (
        <p>{'There are no chat rooms'}</p>
      )}     
    </div>
  );
}

const ChatRoom = ({item}) => {
  return (
    <NavLink to={`${routes.CHAT}/${item._id}/${item.name}`}>
      <div className="w-2/3 p-2 bg-green-300 rounded block m-auto mt-3 mb-3 border border-gray-400 shadow-md hover:shadow-lg">
        <h5 className="text-sm text-white text-center">{item.name}</h5>
      </div>
    </NavLink>
  );
};

export default ChatRoomsList;
