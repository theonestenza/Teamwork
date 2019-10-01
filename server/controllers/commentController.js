import Joi from 'joi';
import Comment from '../models/commentModel';
import Article from '../models/articleModel';

class CommentController {
   commentArticle = (req, res) => {
     const schema = {
       comment: Joi.string().required(),
     };
     const { articleId } = req.params;
     const result = Joi.validate(req.body, schema);
     if (result.error == null) {
       if (!Article.isArticleExist(req.params.articleId)) {
         return res.status(404).send({
           status: 404,
           error: 'The article is not found!',
         });
       }
       const { comment } = req.body;
       const response = Comment.commentOnArticle(res, comment, articleId, req.header('x-auth-token'));
       return res.status(201).send(response);
     }
     return res.status(400).send({
       status: 400,
       error: `${result.error.details[0].message}`,
     });
   };
}

export default CommentController;
