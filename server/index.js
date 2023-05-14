const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json({ limit: '50mb' }));
const cors = require('cors');

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  })
);
const morgan = require('morgan');
app.use(morgan('dev'));
const httpResponse = require('express-http-response');
const port = process.env.PORT || 5000;
app.use(express.static('public'));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
  });

app.use('/api', require('./routes/index'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(httpResponse.Middleware);
