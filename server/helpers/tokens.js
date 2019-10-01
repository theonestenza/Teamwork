import jwt from 'jsonwebtoken';

const generateAuthToken = (id, email) => {
  const token = jwt.sign({ id, email }, process.env.SECRET);
  return token;
};
export default generateAuthToken;
