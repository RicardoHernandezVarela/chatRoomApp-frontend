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

// API CALL TO VERIFY USER
const verifyUser = async () => {
  const options = {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const response = await fetch(`${ENDPOINT}/verify-user`, options);
    const data = await response.json();
    return data;

  } catch(error) {
    console.log('ERROR GETTING ACCOUNT DATA: ', error);
  }
};

// API CALL TO LOGOUT USER
const logoutUser = async () => {
  const options = {
    credentials: 'include',
  };

  try {
    const response = await fetch(`${ENDPOINT}/logout`, options);
    const data = await response.json();
    return data;

  } catch(error) {
    console.log('ERROR GETTING ACCOUNT DATA: ', error);
  }
};

export { createNewAccount, loginUser, verifyUser, logoutUser };