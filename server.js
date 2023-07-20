const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Successful response.');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});