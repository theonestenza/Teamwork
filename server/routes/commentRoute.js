import express from 'express';
import CommentController from '../controllers/commentController';
import auth from '../middlewares/auth';

const router = express.Router();

const commentController = new CommentController();
router.post('/comments', auth, commentController.commentArticle);


export default router;
