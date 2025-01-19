import express from 'express';
import { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } from '../controllers/article.js';

const router = express.Router();

router.post('/add', createArticle);
router.get('/articles', getAllArticles);
router.get('/articles/:id', getArticleById);
router.put('/articles/:id', updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;
