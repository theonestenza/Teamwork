import Joi from 'joi';
import User from '../models/userModel';

class UserController {
    signUp = (req, res) => {
      const schema = {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        gender: Joi.string().required(),
        jobRole: Joi.string().required(),
        department: Joi.string().required(),
        address: Joi.string().required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
        if (User.isEmailTaken(req.body.email)) {
          return res.status(409).send({ status: 409, error: `${req.body.email} is already taken!` });
        }
        const user = User.create(req.body);
        return res.status(201).send(user);
      }
      return res.status(400).send({ status: 400, error: `${result.error.details[0].message}` });
    };

    signIn = (req, res) => {
      const schema = {
        email: Joi.string().email().required(),
        password: Joi.required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
        const user = User.login(req.body);
        if (user.status === 200) {
          return res.status(200).send(user);
        }

        return res.status(401).send(user);
      }

      return res.status(400).send({ status: 400, error: `${result.error.details[0].message}` });

    };
}

export default UserController;
