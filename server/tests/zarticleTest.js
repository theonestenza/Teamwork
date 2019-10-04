import jwt from 'jsonwebtoken';

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../index';

import articles from '../mocha-data/articles';

import status from '../helpers/StatusCode';

const { expect } = chai;

chai.use(chaiHttp);

const noToken = ' ';

const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5mcCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTY3ODU2NTczfQ.WqwWVxxt9J8EN03toJM7K1QQBbTCJKe3lV-32axH';


const token = jwt.sign({ id: 2, firstName: 'byiringiro' }, process.env.SECRET);
const invalidtoken = jwt.sign({ firstName: 'theonestenza@gmail.com' }, process.env.SECRET);
const wrongToken = jwt.sign({ id: 0, firstName: 'theonestenza@gmail.com' }, process.env.SECRET);



describe('POST article with no token provided, api/v1/articles', () => {
  it('should return error', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('Accept', 'application/json')
      .send(articles[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.error).to.equal('Access denied. No token provided');
        done();
      });
  });
});
describe('POST article created successfully, api/v1/articles', () => {
  it('should return article', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.RESOURCE_CREATED);
        expect(res.body.message).to.equal('Article created successfully');
        done();
      });
  });
});

describe('GET specific  article, api/v1/articles/:id', () => {
  it('should return article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/1')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('Article retrieved successfully');
        done();
      });
  });
});

describe('POST article wih banned or deleted , api/v1/articles', () => {
  it('should return error', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', invalidtoken)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('The User associated with this token was banned or deleted!.');
        done();
      });
  });
});

describe('POST article with no access , api/v1/articles', () => {
  it('should return error', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', wrongToken)
      .set('Accept', 'application/json')
      .send(articles[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('The User associated with this token was banned or deleted!.');
        done();
      });
  });
});



describe('POST creating an article with Invalid token , api/v1/articles', () => {
  it('should return an article failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', invalidToken)
      .set('Accept', 'application/json')
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST title is missing , api/v1/articles', () => {
  it('should return title is required', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .send(articles[1])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST some fileds in payload are empty , api/v1/articles', () => {
  it('should return request has empty fields', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', token)
      .set('Accept', 'application/json')
      .send(articles[2])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('POST creating an article with no token , api/v1/articles', () => {
  it('should return creating an article failed', (done) => {
    chai.request(app)
      .post('/api/v1/articles')
      .set('x-auth-token', noToken)
      .set('Accept', 'application/json')
      .send(articles[0])
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.UNAUTHORIZED);
        expect(res.body.status).to.equal(status.UNAUTHORIZED);
        done();
      });
  });
});

describe('GET Get all articles , api/v1/feeds', () => {
  it('should return an array of All artiles ', (done) => {
    chai.request(app)
      .get('/api/v1/feeds')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.message).to.equal('all articles retrieved successfully');
        done();
      });
  });
});


describe('GET article by Id , api/v1/articles/:articleId ', () => {
  it('should return article', (done) => {
    chai.request(app)
      .get('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});

describe('GET deleted article  , api/v1/articles/:articleId ', () => {
  it('should return error', (done) => {
    chai.request(app)
      .get('/api/v1/articles/8')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});


describe('PATCH api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param can not be a string', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/mm')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        expect(res.body.error).to.equal('Article can not be a string');
        done();
      });
  });
});

describe('PATCH api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param is not found', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/97')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});


describe('PATCH api/v1/articles/:articleId article ', () => {
  it('should return article successfully edited', (done) => {
    chai.request(app)
      .patch('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .send(articles[3])
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});

describe('DELETE api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param can not be a string', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/mm')
      .set('Accept', 'application/json')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.BAD_REQUEST);
        expect(res.body.status).to.equal(status.BAD_REQUEST);
        done();
      });
  });
});

describe('DELETE api/v1/articles/:articleId articleId param', () => {
  it('should return articleId param is not found', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/96')
      .set('Accept', 'application/json')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.NOT_FOUND);
        expect(res.body.status).to.equal(status.NOT_FOUND);
        expect(res.body.error).to.equal('Such article is not found!');
        done();
      });
  });
});

describe('DELETE api/v1/articles/:articleId article ', () => {
  it('should return article successfully deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/articles/1')
      .set('Accept', 'application/json')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(status.REQUEST_SUCCEDED);
        expect(res.body.status).to.equal(status.REQUEST_SUCCEDED);
        done();
      });
  });
});