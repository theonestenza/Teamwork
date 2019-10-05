import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import lodash from 'lodash';

dotenv.config();

class User {
  constructor() {
    this.users = [
      {
        id:1,
        firstName:"byiringiro",
        lastName:"viateur",
        password:"password",
        email:"admin@admin.com",
        gender:"M",
        jobRole:"teacher",
        department:"education",
        address:"kigali",
        is_admin: true
      },
      
    ];
  }
  generateAuthToken = (id, firstName, is_admin) => {
    const token = jwt.sign({ id, firstName, is_admin }, process.env.SECRET);
    return token;
  };


    create = (payload) => {
      let {
        firstName,
        lastName,
        email,
        password,
        jobRole,
        department,
        is_admin
      } = payload;
      const currentId = this.users.length + 1;

      let newUser = {
        token: this.generateAuthToken(currentId, firstName, is_admin),
        id: currentId,
        firstName,
        lastName,
        email,
        password,
        jobRole,
        department,
        is_admin,
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
        email,
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
        token: this.generateAuthToken(user.id, user.firstName, user.is_admin),
      };

      result = { status: 200, message: 'User logged successfully', data: result };

      return result;
    };

    isEmailTaken = email => this.users.find(u => u.email === email);

    isUserExist = user_id => this.users.find(u => u.id === user_id);

    
     grabArticleCreatorDetail = (user_id) => {
       const user = this.users.find(u => u.id === parseInt(user_id));
       return user;
     }
}

export default new User();
