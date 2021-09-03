import React from 'react';

function Signup(props) {
  const userAccountBase = {
    name: '',
    email: '',
    password: ''
  };

  const [userAccount, setUserAccount] = React.useState(userAccountBase);

  const onValueChange = (event) => {
    const userAccountCopy = userAccount;
    userAccountCopy[event.target.name] = event.target.value;
    setUserAccount({...userAccountCopy});
  };

  // CREATE ACCOUNT / SIGNUP
  const createAccount = (event) => {
    event.preventDefault();
    console.log(userAccount);
    setUserAccount(userAccountBase);
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
            onChange={(event) => onValueChange(event)} 
          />

          {/* EMAIL INPUT */}
          <AccountInput
            type={'email'}
            name={'email'} 
            placeholder={'email'}
            value={userAccount.email} 
            onChange={(event) => onValueChange(event)} 
          />

          {/* PASSWORD INPUT */}
          <AccountInput
            type={'password'}
            name={'password'} 
            placeholder={'password'}
            value={userAccount.password} 
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

const AccountInput = ({type, name, placeholder, value, onChange}) => {
  return (
    <div className="block m-auto mt-10 bg-gray-200 w-2/3 rounded">
      <input type={type} className="bg-transparent w-full text-gray-600 p-1"
        name={name} 
        placeholder={placeholder}
        value={value} 
        onChange={onChange} 
      />
    </div>
  );
};

export default Signup;
