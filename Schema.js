const mongoose = require('mongoose')
const {module} = require('mongoose')

CommentSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true

    },
    message:{
        type:String,
        required:true
    },
    commentedAt:{
        type:Date,
        default:Date.now()
    }
})

const blogSchema = new mongoose.Schema({
    title: { type: String, unique: true, minlength: 5, required: true },
    content: { type: String, minlength: 50, required: true },
    author: { type: String, required: true },
    tags: [String],
    category: { type: String, default: 'General' },
    likes: [String], // Array of usernames who liked the post
    comments: [commentSchema], // Embedded comments
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date } // No auto-updating middleware
  });

  const Blog = mongoose.model('user',blogSchema)
  module.exports = Blog;