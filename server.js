const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();

const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected successfully.'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send('🎉 KHR Blog API is running successfully!');
});

app.listen(5000, () => console.log('🚀 Server is up and running on port 5000'));
