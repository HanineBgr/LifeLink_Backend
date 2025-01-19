import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: {
      type: String,
      enum: ['Health', 'Wellness', 'Fitness', 'Nutrition'],  // Enum values
      required: true
    },
    imageUrl: { type: String },
    tags: [String],
    status: { type: String, enum: ['published', 'draft'], required: true },
    publishedDate: { type: Date, default: Date.now }
  });
  

const Article = mongoose.model('Article', articleSchema);

export default Article;
