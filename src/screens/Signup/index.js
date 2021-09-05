import React from 'react';
import { createNewAccount } from '../../API/auth';
import Routes from '../../Routes';

function Signup(props) {
  const userAccountBase = {
    name: '',
    email: '',
    password: ''
  };

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
      //console.log('RESPONSE: ', response);
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
      <div className="w-2/3 md:w-1/3 block m-auto border border-gray-500 rounded shadow-md bg-green-400 mt-16">
        <form className="text-center pt-2 pb-2" onSubmit={(event) => createAccount(event)}>
          <h4 className="text-white mt-3 mb-8 text-xl">Create your account</h4>

          {/* USERNAME INPUT */}
          <AccountInput
            type={'text'}
            name={'name'} 
            placeholder={'username'}
            value={userAccount.name}
            error={errorsAccount ? errorsAccount.name : errorsAccount} 
            onChange={(event) => onValueChange(event)} 
          />

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

          <button className="border border-gray-600 p-1 pl-2 pr-2 bg-green-600 shadow-md hover:shadow-lg rounded text-white mt-10 mb-4">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

const AccountInput = ({type, name, autocomplete, placeholder, value, error, onChange}) => {
  return (
    <div className="mt-10 ">
      <div className="block m-auto bg-gray-200 w-2/3 rounded">
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

export default Signup;
