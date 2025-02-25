const express = require('express');
const { resolve } = require('path');
const Blog = require('./Schema')

const app = express();
const port = 3010;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
app.get('/blog',async(req,res)=>{
  try{
    const blogs = await Blog.find()
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  app.get('/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if(!blog) {return res.status(404).json({ message: 'Blog not found' });}
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put('/blogs/:id', async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { ...req.body, updatedAt: Date.now() }, // Manually updating `updatedAt`
        { new: true }
      );
  
      if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });
  
      res.status(200).json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
