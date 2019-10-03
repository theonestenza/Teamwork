import jwt from 'jsonwebtoken';

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import comments from '../models/comment';

import status from '../helpers/StatusCode';

const { expect } = chai;

chai.use(chaiHttp);

const token = jwt.sign({ id: 2, firstName: 'byiringiro' }, process.env.SECRET);


const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5mcCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTY3ODU2NTczfQ.WqwWVxxt9J8EN03toJM7K1QQBbTCJKe3lV-32axH';

// comment test

describe('POST comment with no token provided , api/v1/articles/:id/comments', () => {
  it('should return error', (done) => {
    chai.request(app)
      .post('/api/v1/articles/:id/comments')
      .send(comments[0])
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('Access denied. No token provided');
        done();
      });
  });
});

describe('POST comment with Invalid signature, api/v1/articles/:articleId', () => {
  it('should return error', (done) => {
    chai.request(app)
      .post('/api/v1/articles/2/comments')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .send(comments[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});


describe('POST comment with no comment, api/v1/articles/1/comments', () => {
  it('should return comment is required', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('Accept', 'application/json')
      .set('x-auth-token', token)
      .send(comments[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST /api/v1/articles/:articleId/comments', () => {
  it('should return comment can not be empty', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-auth-token', token)
      .send(comments[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('\"comment\" is not allowed to be empty');
        done();
      });
  });
});


describe('POST /api/v1/articles/:articleId/comments adding comment', () => {
  it('should return comment successfully added', (done) => {
    chai.request(app)
      .post('/api/v1/articles/1/comments')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('x-auth-token', token)
      .send(comments[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.RESOURCE_CREATED);
        done();
      });
  });
});

// describe('POST /api/v1/articles/:articleId/comments artilceId param', () => {
//   it('should return article is not found', (done) => {
//     chai.request(app)
//       .post('/api/v1/articles/5/comments')
//       .set('Accept', 'application/json')
//       .set('Content-Type', 'application/json')
//       .set('x-auth-token', token)
//       .send(comments[1])
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(status.NOT_FOUND);
//         expect(res.body.status).to.equal(status.NOT_FOUND);
//         done();
//       });
//   });
// });

// describe('POST /api/v1/articles/:articleId/comments articleId param', () => {
//   it('should return articleId param can not be a string', (done) => {
//     chai.request(app)
//       .post('/api/v1/articles/th/comments')
//       .set('Accept', 'application/json')
//       .set('x-auth-token', token)
//       .send(comments[1])
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.equal(status.NOT_FOUND);
//         expect(res.body.status).to.equal(status.NOT_FOUND);
//         expect(res.body.error).to.equal('The article is not found!');
//         done();
//       });
//   });
// });

