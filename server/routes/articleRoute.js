import express from 'express';
import ArticleController from '../controllers/articleController';
import CommentController from '../controllers/commentController';
import auth from '../middlewares/auth';

const router = express.Router();

const articleController = new ArticleController();
const commentController = new CommentController();
router.post('/articles', auth, articleController.createArticle);
router.patch('/articles/:articleId', auth, articleController.updateArticle);
router.delete('/articles/:articleId', auth, articleController.deleteArticle);
router.post('/articles/:articleId/comments', auth, commentController.commentArticle);
router.get('/feeds', articleController.getFeeds);
router.get('/articles/:articleId', articleController.getSpecificArticle);

// router.get('/', auth, articleController.findAllArticle);


export default router;
