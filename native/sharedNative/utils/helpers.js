// Helper Functions
const statusOK = res => (res.status >= 200 && res.status <= 299);

const validateBody = res => {
  if (statusOK(res)) {
    return JSON.parse(res._bodyInit);
  }
  throw new Error('User Creation Failed');
};

const catchErr = (err) => {
  console.log(err);
  return null;
};

const headers = { 'Content-Type': 'application/json' };

module.exports = {
  statusOK,
  validateBody,
  catchErr,
  headers,
};
