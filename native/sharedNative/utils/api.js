const config = require('./../config/config');

export const postEvent = (event) => {
  const url = `${config.apiUrl}events`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(event => event._bodyInit);
};
