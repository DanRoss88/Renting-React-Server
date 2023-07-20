const express = require('express');
const app = express();
const database = require("./src/config/config.db");
const morgan = require("morgan");
// const jwt = require("jsonwebtoken");


require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


///// ** Use Middleware ** /////
app.use(express.json());
app.use(morgan('dev'));
app.use(authenticateToken);
const bodyParser = require('body-parser');

/////// ** Require Router Module ** ///////
const mapsRouter = require('./routes/maps');



///// ** Use Router ** /////
app.use('/maps', mapsRouter);



///// ** Start Server ** /////
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Home Page");
});
