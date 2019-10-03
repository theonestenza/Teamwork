# Teamwork
[![Build Status](https://travis-ci.org/theonestenza/Teamwork.svg?branch=develop)](https://travis-ci.org/theonestenza/Teamwork) [![Coverage Status](https://coveralls.io/repos/github/theonestenza/Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/theonestenza/Teamwork?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/f1a2d51a17c752ba7bf3/maintainability)](https://codeclimate.com/github/theonestenza/Teamwork/maintainability)

Teamwork is an internal social network for organizations’ employees. The goal of this
application is to facilitate more interaction between colleagues and facilitate team bonding.

Here is a list of all API Endpoints that you will find:
* **POST/auth/signup** Create an account
* **POST/auth/signin** Login to the dashboard
* **POST/articles** Create an article
* **GET/articles/:articleId** Fetch a specific article
* **GET/feeds** Fetch all articles
* **DELETE/articles/:articleId** Delete article
* **PATCH/articles/:articleId** edit an article
* **POST/articles/:articleId** create comment

# Technology Tools used
* Back-end Framework: **Node/Express JS**
* Linting Library: **ESlint**
* Style Guide: **Airbnb**
* Testing Framework: **Mocha** with **Chai**

# Additional Tools
* JavaScript Es6 with **Babel** transpiler
* TravisCI for Continous Integration
* Istanbul and nyc for test coverage
* CodeClimate and Coveralls for badges
* Heroku for Deployment

The domain name on Heroku is [teamwork-61.herokuapp.com](https://teamwork-61.herokuapp.com)

Here is the list of endpoints on Heruko  **heroku deployment**:
* Create an account [teamwork-61.herokuapp.com/api/v1/auth/signup](https://teamwork-61.herokuapp.com/api/v1/auth/signup)
* Log in to the dashboard [teamwork-61.herokuapp.com/api/v1/auth/signin](https://teamwork-61.herokuapp.com/api/v1/auth/signin)
* Post an article [teamwork-61.herokuapp.com/api/v1/articles](https://teamwork-61.herokuapp.com/api/v1/articles)

* Get specific article [teamwork-61.herokuapp.com/api/v1/articles/:articleId](https://teamwork-61.herokuapp.com/api/v1/articles/:articleId)
* Get all articles [teamwork-61.herokuapp.com/api/v1/feeds](https://teamwork-61.herokuapp.com/api/v1/feeds)

* Delete article [teamwork-61.herokuapp.com/api/v1/articles/:articleId](https://teamwork-61.herokuapp.com/api/v1/articles/:articleId)
* Edit article [teamwork-61.herokuapp.com/api/v1/articles/:articleId](https://teamwork-61.herokuapp.com/api/v1/articles/articleId)
* Post comment [teamwork-61.herokuapp.com/api/v1/articles/:ardicleId](https://teamwork-61.herokuapp.com/api/v1/articles/:ardicleId)



To test endpoints to use [POSTMAN](https://www.getpostman.com)
# Setup Instruction
* Install [git](https://git-scm.com/downloads)
* Install [Node js](https://nodejs.org/en)

To clone github repository use the following url

```
$ git clone **************************
```
Navigate to the folder containing all codes use

```
$ cd Teamwork
```
To install dependincies or dev-dependences in package.json file use

```
$ npm i
```
To start the server use

```
$ npm run dev-start
```
To run the test use

```
$ npm run test
```
For eslint test use eslint name of the file. for example

```
$ eslint index.js
```
