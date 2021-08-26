import React from 'react';

function MessagesList(props) {
  const { msgsList, user } = props;
  const msgListRef = React.useRef(null);

  React.useEffect(() => {
    console.log('msgListRef', Object.keys(msgListRef.current));
  }, [msgsList]);

  return (
    <div>
      <ul className="overflow-y-scroll h-96 pb-2" ref={msgListRef}>
        {msgsList.map((item, index) => {
          return (
            <Message key={item._id} item={{...item, index}} ownMsg={user.name === item.name} />
          );
        })}
      </ul>
    </div>
  );
}

const Message = ({item, ownMsg}) => {
  const border = ownMsg ? 'rounded-tr-2xl ml-4 mr-10' : 'rounded-tl-2xl mr-4 ml-10';
  const position = ownMsg ? 'justify-start' : 'justify-end';
  const msgDate = new Date(item.createdAt);
  const msgTime = `${msgDate.getHours()}:${msgDate.getMinutes()}`;

  return (
    <li className={`flex ${position}`}>
      <div className={`m-3 max-w-max rounded-b-2xl ${border} bg-gray-100 shadow-md`}>
        <span className="text-sm font-bold pl-2 pr-4">{`${item.name}:`}</span>
        <p className="text-sm p-3 pt-1 pb-1">{item.text}</p>
        <p className="text-xs text-right pr-2 pb-2 pt-1">{msgTime}</p>
      </div>
    </li>
  );
};

export default MessagesList;
