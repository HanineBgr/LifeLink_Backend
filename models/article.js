import mongoose from 'mongoose';

const { Schema } = mongoose;
const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});
const Article = mongoose.model("Article", ArticleSchema);

export default Article; 
