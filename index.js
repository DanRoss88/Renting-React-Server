const express = require('express');
const app = express();
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

////// ** Database ** //////
// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// const mongoDB = "insert_your_database_url_here";

// main().catch((err) => console.log(err));
// async function main() {
//   await mongoose.connect(mongoDB);
// }
const { MongoClient, ServerApiVersion } = require('mongodb');
 
const uri = process.env.MONGO_DB;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

///// ** Use Middleware ** /////
app.use(express.json());
app.use(morgan('dev'));
app.use(authenticateToken);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/////// ** Require Router Module ** ///////
// const mapsRouter = require('./src/routes/maps');
const registerRouter = require('./src/routes/register');
const loginRouter = require('./src/routes/login');

///// ** Use Router ** /////
// app.use('/maps', mapsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

///// ** Start Server ** /////
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Home Page");
});


///// ** Authentication ** /////
// const payload = {
//   user_id: user.rows[0].id,
//   email: user.rows[0].email,
//   name: user.rows[0].username,
// };

// const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });


//   const payload = {
//     user_id: createdUser.rows[0].id,
//     email: createdUser.rows[0].email,
//     name: createdUser.rows[0].username,
//   };

//   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// } catch (error) {
//   res.status(500).json({ error: "Failed to create user.", problem: error });
// }
// });

function authenticateToken(req, res, next) {
  if (req.path === "/login" || req.path === "/register") {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.sendStatus(403);
    req.payload = payload;
    next();
  });
}