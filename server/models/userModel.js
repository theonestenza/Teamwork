import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import lodash from 'lodash';

dotenv.config();

class User {
  constructor() {
    this.users = [];
  }

    create = (payload) => {
      const {
        firstName,
        lastName,
        email,
        password,
        jobRole,
        department,
      } = payload;
      const currentId = this.users.length + 1;
      let newUser = {
        token: this.generateAuthToken(currentId, payload.email),
        id: currentId,
        firstName,
        lastName,
        email,
        password,
        jobRole,
        department,
      };
      this.users.push(newUser);
      newUser = {
        status: 201,
        message: 'User created successfully',
        data: lodash.pick(newUser, ['token']),
      };

      return newUser;
    };

    login = (payload) => {  
      const {
        firstName,
        lastName,
        email,
        jobRole,
        department,
        password,
      } = payload;
      const user = this.users.find(u => (u.email === email) && ((u.password === password)));
      if (!user) {
        return {
          status: 401,
          error: 'email or password is incorrect!.',
        };
      }

      let result = {
        token: this.generateAuthToken(user.id, user.firstName),
      };

      result = { status: 200, message: 'User logged successfully', data: result };

      return result;
    };

    isEmailTaken = email => this.users.find(u => u.email === email);

    isUserExist = user_id => this.users.find(u => u.id === user_id);

    generateAuthToken = (id, email) => {
      const token = jwt.sign({ id, email }, process.env.SECRET);
      return token;
    };

     // return a certain user basing on his or id
     grabArticleCreatorDetail = (user_id) => {
       const user = this.users.find(u => u.id === parseInt(user_id));
       return user;
     }
}

export default new User();
