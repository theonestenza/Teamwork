import datetime from 'node-datetime';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Comment {
  constructor() {
    this.comments = [];
  }

    commentOnArticle = (res, comment, articleId, token) => {
      const dt = datetime.create();
      const formatted = dt.format('m/d/Y H:M:S');
      const newId = this.comments.length + 1;
      articleId = parseInt(articleId, 10);
      const newComment = {
        commentId: newId,
        articleId,
        authorId: this.getUserId(res, token),
        comment,
        createdOn: formatted,
      };
      this.comments.push(newComment);


      return newComment;
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

    getCommentsByArticleId = (id) => {
      const { comments } = this;
      console.log(comments);
      console.log(id);
      const result = [];
      for (let item = 0; item < comments.length; item += 1) {
        if (comments[item].articleId === parseInt(id, 10)) {
          result.push(comments[item]);
        }
      }
      return result;
    }
}

export default new Comment();
