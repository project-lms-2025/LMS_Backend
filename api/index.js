const express = require('express');
const app = express();

app.use(express.json());

// root route
app.get('/', (req, res) => {
  res.send('Hello from the Node.js server on Vercel!');
});

module.exports = app;
