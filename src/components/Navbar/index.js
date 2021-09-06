import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../Routes';

function Navbar() {
  const [menuIconHidden, setMenuIconHidden] = React.useState(true);

  return (
    <div className="bg-green-500 grid grid-cols-3 pt-1 shadow-lg z-10 fixed w-screen border-b border-gray-400">
      <div className="col-start-1 cursor-pointer flex justify-center items-center md:hidden"
        onClick={() => setMenuIconHidden(!menuIconHidden)}>
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      <NavLink className="col-start-2 p-2" to={routes.HOME}>
        <h3 className="text-center font-bold text-white text-2xl">CHAT</h3>
      </NavLink>

      <nav className="col-start-1 md:col-start-3 pt-1 pb-1 relative">
        <ul className="hidden md:flex md:justify-center">
          <li className="text-center p-2 mr-2 text-white">
            <NavLink to={routes.LOGIN}>Login</NavLink>
          </li>
          <li className="text-center p-2 mr-2 text-white">
            <NavLink to={routes.SIGNUP}>Signup</NavLink>
          </li>
          <li className="text-center p-2 mr-2 text-white">
            <NavLink to={routes.HOME}>Logout</NavLink>
          </li>
        </ul>

        <ul className={`${menuIconHidden ? 'hidden' : 'block'} md:hidden rounded border bg-white text-green-500 absolute -top-2 left-1/4`}>
          <li className="text-center p-2 hover:bg-gray-300">
            <NavLink to={routes.LOGIN}>Login</NavLink>
          </li>
          <li className="text-center p-2 hover:bg-gray-300">
            <NavLink to={routes.SIGNUP}>Signup</NavLink>
          </li>
          <li className="text-center p-2 hover:bg-gray-300">
            <NavLink to={routes.HOME}>Logout</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
