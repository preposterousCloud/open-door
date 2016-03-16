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
  .then(event => JSON.parse(event._bodyInit));
};

export const closeEvent = (event) => {
  console.log(event);
  const url = `${config.apiUrl}events/${event.id}/closeEvent`;
  return fetch(url, {
    method: 'POST',
  })
  .then(event => JSON.parse(event._bodyInit));
};
