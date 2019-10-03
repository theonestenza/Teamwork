import jwt from 'jsonwebtoken';
import status from './StatusCode';

const getUserId = (res, token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded.id;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({ status: 'error', error: error.message });
  }
};

// const getUserName = (res, token) => {
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     return decoded.firstName;
//   } catch (error) {
//     return res.status(status.BAD_REQUEST).send({ status: 'error', error: error.message });
//   }
// };

export default getUserId;
