import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

/* Import Consumer from Context */
import { UserContext } from '../../context'; 

function Chat() {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;

  return (
    <div>
      <h1>{`CHAT ${JSON.stringify(user)}`}</h1>
      <NavLink className="ml-2 border-2 rounded" exact to={routes.HOME}>Go to Home</NavLink>
    </div>
  );
}

export default Chat;