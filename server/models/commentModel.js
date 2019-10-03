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
      const result = [];
      for (let item = 0; item < comments.length; item += 1) {
        if (comments[item].articleId === parseInt(id, 10)) {
          result.push(comments[item]);
        }
      }
      return result;
    };
    isCommentTheSame = (comment) => {
      const foundComment = this.comments.find(a => a.comment === comment);
      return foundComment;
    }
    isCommentExist = commentId => this.comments.find(c => c.commentId === parseInt(commentId, 10));

    isOwnerOfComment = (commentId, token, res) => {
      const employeeId = this.getUserId(res, token);
      
      const comment = this.comments.find(
        c => c.commentId === parseInt(commentId, 10)
       && c.authorId === employeeId,
      );
      
      return comment;
    };
    flag = (commentId) => {
      const foundComment = this.comments.find(c => c.articleId === parseInt(commentId, 10));
      foundComment.status= 'unappropriate';
      return {
        status: 200,
        message: 'comment flagged successfully',
      };
    }

    removeComment = (commentId) => {
      const foundComment = this.comments.find(c => c.commentId === parseInt(commentId, 10));
      if( foundComment.status= 'unappropriate'){
        const index = this.comments.indexOf(foundComment);
      this.comments.splice(index, 1);
      return {
        status: 200,
        message: 'comment deleted successfully',
      };
      }
      return {
        status: 403,
        message: 'comment is not yet flagged',
      };
    };
}

export default new Comment();
