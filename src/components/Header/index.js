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
    <div className="flex justify-between items-center h-12 bg-transparent border-b border-gray-300">
      <div className="px-4">
        <h5>Header</h5>
      </div>
      <div className="flex px-4">
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
  const btnStyles = 'h-8 rounded-full py-1.5 px-3 mx-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-blue-500 md:border-2';
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
