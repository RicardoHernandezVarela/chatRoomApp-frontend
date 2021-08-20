import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

/* Import context Consumer */
import { UserContext } from '../../context';

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
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const { setUser } = userContext.actions;

  return (
    <div>
      <h1>{`Home ${JSON.stringify(user)}`}</h1>
      <button className="ml-2 border-2 rounded" onClick={() => setUser(users[0])}>Set first user</button>
      <button className="ml-2 border-2 rounded" onClick={() => setUser(users[1])}>Set second user</button>

      <NavLink className="ml-2 border-2 rounded" exact to={routes.CHAT}>Go to Chat</NavLink>
    </div>
  );
}

export default Home;
