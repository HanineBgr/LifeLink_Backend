import express from 'express';
import Article from '../models/article.js'; 
import scrapeArticles from '../controllers/article.js'; 

const router = express.Router();

router.get('/scrape', async (req, res) => {
  try {
    await scrapeArticles(); 
    res.status(200).json({ message: 'Scraping completed!' });
  } catch (err) {
    res.status(500).json({ message: 'Error during scraping', error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find(); 
    res.status(200).json(articles); 
  } catch (err) {
    res.status(500).json({ message: 'Error fetching articles', error: err });
  }
});

export default router;
