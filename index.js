const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoute = require("./src/routes/AuthRoute");
const bodyParser = require("body-parser");
const socketio = require("socket.io");

const server = require("http").createServer(app);
const io = socketio(server);

require("dotenv").config();
const { PORT, MONGO_DB } = process.env;

////// ** Database ** //////
mongoose
  .connect(MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Renting is connected successfully"))
  .catch((err) => console.error(err));

///// ** Use Middleware ** /////
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

///// ** Use Router ** /////
app.use("/", authRoute);

///// ** Start Server ** /////
server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

////// ** Socket.io ** ////////
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected.`);
  });
});
