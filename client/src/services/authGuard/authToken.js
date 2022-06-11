export const authToken = (getState) => {
  const token = getState.auth.access_token;

  const headers = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  if (token) {
    headers.headers['x-auth-token'] = token;
  }
  return headers;
};
