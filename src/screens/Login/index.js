import React from 'react';
import { loginUser } from '../../API/auth';
import Routes from '../../Routes';
import SignupLoginForm from '../../components/SignupLoginForm';

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
    <div className="bg-gray-200 pt-16">
      <SignupLoginForm
        onSubmit={login}
        userAccount={userAccount}
        errorsAccount={errorsAccount}
        onValueChange={onValueChange}
        login
      />
    </div>
  );
}

export default Login;
