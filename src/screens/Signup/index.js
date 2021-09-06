import React from 'react';
import { createNewAccount } from '../../API/auth';
import Routes from '../../Routes';
import SignupLoginForm from '../../components/SignupLoginForm';

/* IMPORT USER CONTEXT */
import { UserContext } from '../../context/';

function Signup(props) {
  const userAccountBase = {
    name: '',
    email: '',
    password: ''
  };

  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const { setUser } = userContext.actions;

  const [userAccount, setUserAccount] = React.useState(userAccountBase);
  const [errorsAccount, setErrorsAccount] = React.useState(null);

  const onValueChange = (event) => {
    const userAccountCopy = userAccount;
    userAccountCopy[event.target.name] = event.target.value;
    setUserAccount({...userAccountCopy});
  };

  // CREATE ACCOUNT / SIGNUP
  const createAccount = async (event) => {
    event.preventDefault();
    
    // API CALL TO CREATE ACCOUNT / SIGNUP
    const response = await createNewAccount(userAccount);

    if (response.user) {
      setUser(response.user);
      setUserAccount(userAccountBase);
      setErrorsAccount(null);

      // REDIRECT TO HOME WHEN USER ACCOUNT IS CREATED
      props.history.push(Routes.HOME);

    } else {
      console.log('ERRORS: ', response.errors);
      setErrorsAccount(response.errors);
    }
  };

  return (
    <div className="bg-gray-200 pt-16">
      <SignupLoginForm
        onSubmit={createAccount}
        userAccount={userAccount}
        errorsAccount={errorsAccount}
        onValueChange={onValueChange}
      />
    </div>
  );
}

export default Signup;
