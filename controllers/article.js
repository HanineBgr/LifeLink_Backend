import axios from 'axios';
import * as cheerio from 'cheerio';
import Article from '../models/article.js'; 

const scrapeArticles = async () => {
  try {
    const response = await axios.get('https://www.medicalnewstoday.com/');
    const html = response.data;

    const $ = cheerio.load(html);

    const articles = [];

    $('.listing-wide .card').each((i, element) => {
      const title = $(element).find('.card__title').text().trim();
      const link = $(element).find('.card__title a').attr('href');

      if (title && link) {
        articles.push({ title, link: `https://www.medicalnewstoday.com${link}` });
      }
    });

    for (const article of articles) {
      const existingArticle = await Article.findOne({ title: article.title });
      if (!existingArticle) {
        const newArticle = new Article(article);
        await newArticle.save();
        console.log(`Saved article: ${article.title}`);
      } else {
        console.log(`Article already exists: ${article.title}`);
      }
    }
    console.log('Scraping completed!');
  } catch (error) {
    console.error('Error scraping articles:', error);
  }
};

export default scrapeArticles;
