import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { logoutUser } from '../../API/auth';
import Routes from '../../Routes';

/* CONTEXT */
import { UserContext } from '../../context';

function Header(props) {
  const userContext = React.useContext(UserContext);
  const { user } = userContext;

  const { setUser } = userContext.actions;

  let history = useHistory();

  const logout = async () => {
    const response = await logoutUser();
    setUser(null);

    const currentPath = history.location.pathname;

    if (currentPath !== Routes.HOME) {
      // REDIRECT TO HOME WHEN USER LOGS OUT
      history.push(Routes.HOME);
    }
  };

  return (
    <div className="flex justify-between items-center w-full md:w-4/5 h-12 bg-gray-200 border-b border-gray-300 fixed z-10 shadow-md">
      <div className="px-2 block md:hidden" id="menu-icon">
        <svg className="w-6 h-6" id="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path id="menu-icon" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <div className="px-2">
        <h5>Header</h5>
      </div>
      <div className="flex px-2">
        <NavOption route={!user ? Routes.LOGIN : null} 
                   text={!user ? 'Log in' : 'Log out'}
                   onClick={user ? logout : null}
        />

        {!user && (
          <NavOption route={Routes.SIGNUP} text={'Sign up'} />
        )}
      </div>
    </div>
  );
}

const NavOption = ({ route, text, onClick }) => {
  const btnStyles = 'h-8 rounded-full py-1.5 px-3 mx-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-blue-500 border-2';
  const btnEffect = 'hover:bg-primary hover:text-white transition ease-out duration-500';

  if (route) {
    return (
      <NavLink to={route}>
        <h3 className={`${btnStyles} ${btnEffect}`} >
          {text}
        </h3>
      </NavLink>
    );
  } else {
    return (
      <h3 className={`${btnStyles} ${btnEffect}`} onClick={() => onClick()} >
        {text}
      </h3>
    );
  }
};

export default Header;
