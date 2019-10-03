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
      if (Comment.isCommentTheSame(req.body.comment)) {
        return res.status(404).send({ status: 409, error: 'Comment is already exist' });
      }
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
  
   flagComment = (req, res) => {
    let { commentId } = req.params;
    if (!Comment.isCommentExist(commentId)) {
      return res.status(404).send({
        status: 404,
        error: 'Such comment is not found!',
      });
    }
    const token = req.header('x-auth-token');
    if (!Comment.isOwnerOfComment(commentId, token, res)) {
      return res.status(403).send({
        status: 403,
        error: 'you are not the owner of comment',
      });
    }
    const response = Comment.flag(commentId);
    return res.status(200).send(response);
    
  }
  deleteFlaggedComment = (req,res) =>{
    let { commentId } = req.params;
    if (!Comment.isCommentExist(commentId)) {
      return res.status(404).send({
        status: 404,
        error: 'Such comment is not found!',
      });
    }
    const response = Comment.removeComment(commentId);
    return res.status(200).send(response);
  }

}

export default CommentController;
