
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import status from '../helpers/StatusCode';

import users from '../models/users';

const { expect } = chai;

chai.use(chaiHttp);

describe('POST sign up wih incomplete information, api/v1/auth/signup', () => {
  it('should return gender is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('\"gender\" is required');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST sign up wih no information, api/v1/auth/signup', () => {
  it('should return firstName is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('"firstName\" is required');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST sign up successfully, api/v1/auth/signup', () => {
  it('should return success', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('success');
        expect(res.body.status).to.equal(status.RESOURCE_CREATED);
        done();
      });
  });
});


describe('POST sign up with email taken, api/v1/auth/signup', () => {
  it('should return {email} is already taken!', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[3])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_CONFLICT);
        expect(res.body.error).to.equal('bvikjlhja@gmail.com is already taken!');
        done();
      });
  });
});

describe('POST sign up without address, api/v1/auth/signup', () => {
  it('should return address is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .set('Accept', 'application/json')
      .send(users[4])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('\"address\" is required');
        done();
      });
  });
});

describe('POST sign in successful, api/v1/auth/signin', () => {
  it('should return sign in successful', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[5])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('success');
        done();
      });
  });
});

describe('POST sign in with no accont, api/v1/auth/signin', () => {
  it('should return email or password is incorrect', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[6])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('email or password is incorrect!.');
        done();
      });
  });
});

describe('POST sign in with missing password, api/v1/auth/signin', () => {
  it('should return password is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[7])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('\"password\" is required');
        done();
      });
  });
});

describe('POST sign in error, api/v1/auth/signin', () => {
  it('should return sign in error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[8])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('\"email\" is required');
        done();
      });
  });
});

describe('POST api/v1/auth/signin email is missing', () => {
  it('should return email is required', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .set('Accept', 'application/json')
      .send(users[9])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});