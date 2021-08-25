import React from 'react';

function AddChatRoomForm(props) {
  const { addNewChatRoom } = props;
  const INITIAL_NAME_VALUE = '';
  const [name, setName] = React.useState(INITIAL_NAME_VALUE);

  const onSubmit = (event) => {
    event.preventDefault();

    const newRoom = {
      name: name,
      _id: `${name}123`,
    };

    addNewChatRoom(newRoom);
    setName(INITIAL_NAME_VALUE);
  };

  return (
    <div className="block m-auto mt-3 mb-2 rounded border border-gray-500 bg-green-300 w-2/3 p-2">
      <form className="text-center" onSubmit={(event) => onSubmit(event)}> 
        <h4 className="text-base text-white mb-1">{'Add new chatRoom'}</h4>
        <div className="block mb-2">
          <input id="name" className="bg-transparent border-b mt-2 text-white text-center" value={name} onChange={(event) => setName(event.target.value)}/>
          <br/>
          <label htmlFor="name" className="text-sm text-white">ChatRoom Name</label>
        </div>

        <button type="submit" className="bg-green-500 rounded mt-2 mb-2 text-white w-1/2 p-1 shadow-md">Save</button>
      </form>
    </div>
  );
}

export default AddChatRoomForm;
