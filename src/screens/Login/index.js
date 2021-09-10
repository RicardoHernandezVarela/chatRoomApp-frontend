import React from 'react';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../../API/auth';
import Routes from '../../Routes';
import { SignupLoginHeader, SignupLoginForm, SignupLoginMessage } from '../../components/SignupLoginForm';

/* IMPORT USER CONTEXT */
import { UserContext } from '../../context/';

function Login(props) {
  const userAccountBase = {
    name: '',
    email: '',
    password: ''
  };

  const userContext = React.useContext(UserContext);
  const { setUser } = userContext.actions;

  const [userAccount, setUserAccount] = React.useState(userAccountBase);
  const [errorsAccount, setErrorsAccount] = React.useState(null);

  const onValueChange = (event) => {
    const userAccountCopy = userAccount;
    userAccountCopy[event.target.name] = event.target.value;
    setUserAccount({...userAccountCopy});
  };

  // CREATE ACCOUNT / SIGNUP
  const login = async (event) => {
    event.preventDefault();
    
    // API CALL TO LOGIN USER
    const response = await loginUser(userAccount);

    if (response.user) {
      setUser(response.user);
      setUserAccount(userAccountBase);
      setErrorsAccount(null);

      // REDIRECT TO HOME WHEN USER LOGIN
      props.history.push(Routes.HOME);

    } else {
      console.log('ERRORS: ', response.errors);
      setErrorsAccount(response.errors);
    }
  };

  return (
    <div className="block bg-gray-200 w-screen md:w-4/5 h-screen m-0 p-0">
      <SignupLoginHeader />

      <SignupLoginForm
        onSubmit={login}
        userAccount={userAccount}
        errorsAccount={errorsAccount}
        onValueChange={onValueChange}
        login
      />

      <SignupLoginMessage login />
    </div>
  );
}

export default Login;
