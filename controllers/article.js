import Article from '../models/article.js';

export const createArticle = async (req, res) => {
  const { title, content, author, category, imageUrl, tags, status } = req.body;

  try {
    const newArticle = new Article({
      title,
      content,
      author,
      category,
      imageUrl,
      tags,
      status
    });

    await newArticle.save();

    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (error) {
    console.error("Error creating article", error);
    res.status(500).json({ message: 'Error creating article', error: error.message });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: 'published' }).sort({ publishedDate: -1 });
    res.status(200).json(articles);
  } catch (error) {
    console.error("Error fetching articles", error);
    res.status(500).json({ message: 'Error fetching articles', error: error.message });
  }
};

export const getArticleById = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("Error fetching article", error);
    res.status(500).json({ message: 'Error fetching article', error: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, category, imageUrl, tags, status } = req.body;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.title = title || article.title;
    article.content = content || article.content;
    article.author = author || article.author;
    article.category = category || article.category;
    article.imageUrl = imageUrl || article.imageUrl;
    article.tags = tags || article.tags;
    article.status = status || article.status;

    await article.save();

    res.status(200).json({ message: 'Article updated successfully', article });
  } catch (error) {
    console.error("Error updating article", error);
    res.status(500).json({ message: 'Error updating article', error: error.message });
  }
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.remove();

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error("Error deleting article", error);
    res.status(500).json({ message: 'Error deleting article', error: error.message });
  }
};
