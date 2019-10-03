import jwt from 'jsonwebtoken';

const generateAuthToken = (id, firstName) => {
  const token = jwt.sign({ id, firstName }, process.env.SECRET);
  return token;
};
export default generateAuthToken;
