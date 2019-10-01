
import faker from 'faker';

const fakerMail = faker.internet.email();
const fakerPassword = faker.internet.password();
const users = [

  // Signup user

  // 0 user with incomplete information
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: fakerMail,
    password: fakerPassword,
  },

  // 1 user with no information
  {

  },

  // 2 User with correct information
  {
    firstName: 'byiringiro',
    lastName: 'viateur',
    email: 'bvikjlhja@gmail.com',
    password: '12345',
    gender: 'male',
    jobRole: 'student',
    department: 'leaner',
    address: 'kigali',
  },

  // 3 User with email taken
  {
    firstName: 'byiringiro',
    lastName: 'viateur',
    email: 'bvikjlhja@gmail.com',
    password: '12345',
    gender: 'male',
    jobRole: 'student',
    department: 'leaner',
    address: 'kigali',
  },

  // 4 user with missing addres
  {
    firstName: 'byiringiro',
    lastName: 'viateur',
    email: 'bvikjlhja@gmail.com',
    password: '12345',
    gender: 'male',
    jobRole: 'student',
    department: 'leaner',
  },

  // sign in

  // 5 user with correct information
  {
    email: 'bvikjlhja@gmail.com',
    password: '12345',
  },
  // 6 user with incorrect information
  {
    email: fakerMail,
    password: 'fakerPassword',
  },
  // 7 user  with missing password
  {
    email: fakerMail,
  },
  // 8 user with incorrect information
  {
    password: fakerPassword,
  },
 // 9 User with invalid email 
 {
  firstName: 'byiringiro',
  lastName: 'viateur',
  email: 'bvikjlhja@.com',
  password: '12345',
  gender: 'male',
  jobRole: 'student',
  department: 'leaner',
  address: 'kigali',
},

];
export default users;
