import React from 'react';

function MessageInput(props) {
  const { sendMessage, setMessage, message } = props;

  return (
    <div className="bg-gray-300 rounded border border-gray-500 mx-4 mt-2 overflow-hidden">
      <form className="flex justify-center" onSubmit={(event) => sendMessage(event)}>
        <input type="text" className="bg-gray-200 w-3/4 h-10 pl-1 border-r border-gray-500 focus:outline-none" 
               value={message} 
               onChange={(event) => setMessage(event.target.value)} 
        />
        <button className="m-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
