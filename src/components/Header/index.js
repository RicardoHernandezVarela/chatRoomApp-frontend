import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../../Routes';

/* CONTEXT */
import { UserContext } from '../../context';

function Header(props) {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;

  return (
    <div className="flex justify-between items-center h-12 bg-transparent border-b border-gray-300">
      <div className="px-4">
        <h5>Header</h5>
      </div>
      <div className="flex px-4">
        <NavOption route={!user ? Routes.LOGIN : Routes.LOGOUT} text={!user ? 'Log in' : 'Log out'} />

        {!user && (
          <NavOption route={Routes.SIGNUP} text={'Sign up'} />
        )}
      </div>
    </div>
  );
}

const NavOption = ({ route, text }) => {
  return (
    <NavLink to={route}>
      <h3 className='h-8 rounded-full py-1.5 px-3 mx-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-blue-500 md:border-2 hover:bg-primary hover:text-white transition ease-out duration-500'>
        {text}
      </h3>
    </NavLink>
  );
};

export default Header;
