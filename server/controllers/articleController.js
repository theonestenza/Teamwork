import Joi from 'joi';
import Article from '../models/articleModel';

class ArticleController {
    createArticle = (req, res) => {
      const schema = {
        title: Joi.string().required(),
        article: Joi.string().required(),
      };
      const result = Joi.validate(req.body, schema);
      if (result.error == null) {
        const article = Article.create(res, req.body, req.header('x-auth-token'));
        return res.status(201).send(article);
      }
      return res.status(400).send({
        status: 400,
        error: `${result.error.details[0].message}`,
      });
    };

  deleteArticle = (req, res) => {
    const { articleId } = req.params;
    const token = req.header('x-auth-token');
    if (isNaN(articleId)) {
      return res.status(400).send({
        status: 400,
        error: 'Article can not be a string',
      });
    }
    if (!Article.isOwnerOfArticle(articleId, token, res)) {
      return res.status(403).send({
        status: 403,
        error: 'you are not the owner of article',
      });
    }
    const response = Article.delete(res, articleId, token);
    return res.status(200).send(response);
  };

    updateArticle = (req, res) => {
      const { articleId } = req.params;
      const token = req.header('x-auth-token');
      if (isNaN(articleId)) {
        return res.status(400).send({
          status: 400,
          error: 'Article can not be a string',
        });
      }
      if (!Article.isOwnerOfArticle(articleId, token, res)) {
        return res.status(403).send({
          status: 403,
          error: 'you are not the owner of article',
        });
      }
      const result = Article.update(res, req.params, req.body, token);
      return res.status(200).send({
        status: 200,
        message: 'article successfully edited',
        data: result,
      });
    };

    getFeeds = (req, res) => {
      const feeds = Article.getAllArticles();
      return res.status(200).send(feeds);
    };

    getSpecificArticle = (req, res) => {
      let { articleId } = req.params;
      articleId = articleId.trim();
      if (isNaN(articleId)) {
        return res.status(400).send({
          status: 400,
          error: 'articleId can not be string',
        });
      }
      if (!Article.isArticleExist(articleId)) {
        return res.status(404).send({
          status: 404,
          error: 'Such article is not found!',
        });
      }
      const article = Article.getArticleById(articleId);
      return res.status(200).send(article);
    };
}

export default ArticleController;
