import React from 'react';
import { NavLink } from 'react-router-dom';
import Routes from '../../Routes';

function SignupLoginForm(props) {
  const { onSubmit, userAccount, errorsAccount, onValueChange, login } = props;

  return (
    <div className="w-4/5 md:w-1/2 block m-auto border border-gray-400 rounded shadow-md bg-green-400 mt-24">
      <form className="text-center pt-2 pb-2" onSubmit={(event) => onSubmit(event)}>
        <h4 className="text-white mt-3 mb-8 text-xl">{!login ? 'Create your account' : 'Login to your account'}</h4>

        {/* USERNAME INPUT */}
        {!login && (
          <AccountInput
            type={'text'}
            name={'name'} 
            placeholder={'username'}
            value={userAccount.name}
            error={errorsAccount ? errorsAccount.name : errorsAccount} 
            onChange={(event) => onValueChange(event)} 
          />
        )}

        {/* EMAIL INPUT */}
        <AccountInput
          type={'email'}
          name={'email'} 
          placeholder={'email'}
          value={userAccount.email} 
          error={errorsAccount ? errorsAccount.email : errorsAccount}  
          onChange={(event) => onValueChange(event)} 
        />

        {/* PASSWORD INPUT */}
        <AccountInput
          type={'password'}
          name={'password'}
          autocomplete={'new-password'} 
          placeholder={'password'}
          value={userAccount.password}
          error={errorsAccount ? errorsAccount.password : errorsAccount} 
          onChange={(event) => onValueChange(event)} 
        />

        <button className="border border-gray-500 p-1 pl-2 pr-2 bg-green-600 shadow-md hover:shadow-lg rounded text-white mt-10 mb-4">
          {!login ? 'Create account' : 'Login'}
        </button>
      </form>
    </div>
  );
}

const SignupLoginHeader = () => {
  return (
    <div className="w-full md:w-4/5 h-12 bg-gray-200 border-b border-gray-300 fixed z-10 shadow-md flex justify-center items-center">
      <NavLink to={Routes.HOME}>
        <h5 className="text-blue-500 text-lg font-bold uppercase">Chatroom</h5>
      </NavLink>
    </div>
  );
};

const AccountInput = ({type, name, autocomplete, placeholder, value, error, onChange}) => {
  return (
    <div className="mt-10 ">
      <div className="block m-auto bg-gray-200 w-4/5 rounded">
        <input type={type} className="bg-transparent w-full text-gray-600 p-1"
          name={name}
          autoComplete={autocomplete || 'off'}  
          placeholder={placeholder}
          value={value} 
          onChange={onChange} 
        />
      </div>

      {error && (
        <div className="mt-1 mr-4 mb-1 ml-4">
          <span className="text-sm text-white">{error}</span>
        </div>
      )}
    </div>
  );
};

const SignupLoginMessage = ({ login }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <p className="text-gray-500 text-sm">
        {login ? 'Don´t you have an account yet?' : 'Already have an account?'}
      </p>
      <NavLink to={login ? Routes.SIGNUP : Routes.LOGIN}>
        <span className="text-blue-500 text-sm ml-2">{login ? 'Create one' : 'Log In'}</span>
      </NavLink>
    </div>
  );
};

export { SignupLoginHeader, SignupLoginForm, SignupLoginMessage };
