import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/userModel';

dotenv.config();

const admin = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) { return res.status(401).send({ status: 401, error: 'Access denied. No token provided' }); }

  try {
    const decoded_jwt = jwt.verify(token, process.env.SECRET);
    if (!User.isUserExist(decoded_jwt.id)) {
      return res.status(404).send({ status: 404, error: 'The User associated with this token was banned or deleted!.' });
    }

    if (!decoded_jwt.is_admin) {
      return res.status(403).send({ status: 403, error: 'You are not authorized to perform this action.' });
    }
    next();
  } catch (error) {
    return res.status(400).send(
      { status: 400, error: error.message },
    );
  }
};

export default admin;