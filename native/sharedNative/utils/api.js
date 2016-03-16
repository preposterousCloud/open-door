
/**
 * 
 */
export const postEvent = (event) => {
  return (dispatch) => {
    const url = `${baseUrl}event/${userName}`;
    return fetch(url, {
      method: 'POST',
      body: event
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((event) => {
      return dispatch({
        type: 'SET_USER',
        user: JSON.parse(user._bodyInit),
      });
    });
  };
};