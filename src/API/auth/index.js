const ENDPOINT = 'http://localhost:5000';

// API CALL TO CREATE ACCOUNT / SIGNUP
const createNewAccount = async (accountData) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(accountData),
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await fetch(`${ENDPOINT}/signup`, options);
    const data = await response.json();
    return data;

  } catch(error) {
    console.log('ERROR POSTING ACCOUNT DATA: ', error);
  }
};

// API CALL TO LOGIN USER
const loginUser = async (accountData) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(accountData),
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await fetch(`${ENDPOINT}/login`, options);
    const data = await response.json();
    return data;

  } catch(error) {
    console.log('ERROR POSTING ACCOUNT DATA: ', error);
  }
};

export { createNewAccount, loginUser };