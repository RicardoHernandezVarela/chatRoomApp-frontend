const ENDPOINT = 'http://localhost:5000';

// API CALL TO CREATE ACCOUNT / SIGNUP
const createNewAccount = async (accountData) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(accountData),
    headers: { 'Content-Type': 'application/json' }
  };
  const result = {user: null, errors: null};

  try {
    const response = await fetch(`${ENDPOINT}/signup`, options);
    const data = await response.json();
    result.user = data;

  } catch(error) {
    result.errors = error;
  }

  return result;
};

export { createNewAccount };