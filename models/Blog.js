const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    date: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Blog', BlogSchema);