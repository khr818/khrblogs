const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

router.get('/', async (req, res) => {
    const blogs = await Blog.find().populate('author', 'username');
    res.json(blogs);
});

router.post('/', async (req, res) => {
    if (!req.session.userId) return res.status(403).json({ error: 'Unauthorized' });
    const { title, content, image } = req.body;
    const blog = new Blog({ title, content, image, author: req.session.userId });
    await blog.save();
    res.status(201).json(blog);
});

router.put('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.session.userId) return res.status(403).json({ error: 'Unauthorized' });
    Object.assign(blog, req.body);
    await blog.save();
    res.json(blog);
});

router.delete('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.author.toString() !== req.session.userId) return res.status(403).json({ error: 'Unauthorized' });
    await blog.remove();
    res.json({ message: 'Deleted' });
});

module.exports = router;