import datetime from 'node-datetime';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Comment from './commentModel';

dotenv.config();

class Article {
  constructor() {
    this.articles = [{
      articleId: 1,
      authorId: 1,
      title: 'andela Bootcamp',
      article: 'andela is the best company around the world',
      createdOn: '09/21/2019 9:45:56',
    }];
  }

    create = (res, data, token) => {
      const {
        title,
        article,
      } = data;
      const dt = datetime.create();
      const formatted = dt.format('m/d/Y H:M:S');
      const newId = this.articles.length + 1;

      let newArticle = {
        articleId: newId,
        authorId: this.getUserId(res, token),
        title,
        article,
        createdOn: formatted,
      };
      this.articles.push(newArticle);
      newArticle = {
        status: 201,
        message: 'success',
        data: newArticle,
      };

      return newArticle;
    };

    update = (res, { articleId }, { title, article }, token) => {
      const foundArticle = this.articles.find(a => a.articleId === parseInt(articleId, 10));
      if (!foundArticle) return res.status(404).send({ status: 404, error: 'Such article is not found!' });
      const editorId = this.getUserId(res, token);
      const dt = datetime.create();
      const formatted = dt.format('m/d/Y H:M:S');
      foundArticle.title = title;
      foundArticle.article = article;
      foundArticle.createdOn = formatted;
      foundArticle.authorId = editorId;

      let result = {
        title,
        article,
        formatted,
      };
      return result;
    };

    getUserId = (res, token) => {
      try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return decoded.id;
      } catch (error) {
        return res.status(400).send({
          status: 400,
          error: error.message,
        });
      }
    };

    delete = (res, id, token) => {
      const article = this.articles.find(a => a.articleId === parseInt(id, 10));
      if (!article) return res.status(404).send({ status: 404, error: 'Such article is not found!' });
      const index = this.articles.indexOf(article);
      this.articles.splice(index, 1);
      return {
        status: 200,
        message: 'article successfully deleted',
      };
    };

    isArticleExist = articleId => this.articles.find(a => a.articleId === parseInt(articleId, 10));

    getAllArticles = () => {
      const articles = this.articles.sort((a, b) => (new Date(b.createdOn)).getTime()
      - (new Date(a.createdOn)).getTime());
      return {
        status: 200,
        message: 'success',
        data: articles,
      };
    };

    getArticleById = (id) => {
      const foundArticle = this.articles.find(a => a.articleId === parseInt(id, 10));
      let {
        articleId,
        authorId,
        title,
        article,
        createdOn,
      } = foundArticle;
      let response = {
        articleId,
        authorId,
        title,
        article,
        createdOn,
        comments: Comment.getCommentsByArticleId(id),

      };
      return {
        status: 200,
        message: 'success',
        data: response,
      };
    };

    isOwnerOfArticle = (articleId, token, res) => {
      const employeeId = this.getUserId(res, token);
      const article = this.articles.find(
        a => a.id === parseInt(articleId, 10)
       && a.authorId === employeeId,
      );
      return article;
    };
}

export default new Article();
