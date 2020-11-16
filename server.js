const path = require('path');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8090;

app.use(express.static(path.join(__dirname, '.')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/./index.html`);
});

app.listen(PORT, () => {});