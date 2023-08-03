const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("dotenv").config();


module.exports.mapApi = async (req, res, next) => {

  try {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Replace this with your actual environment variable for the API key
    if (!apiKey) {
      return res.status(500).json({ error: "Google Maps API key not found on the server" });
    }

    res.json({ apiKey });
  } catch (error) {
    console.error("Error fetching Google Maps API key:", error);
    res.status(500).json({ error: "Failed to fetch Google Maps API key" });
  }
};

module.exports.messagesApi = async (req, res, next) => {

  try {
    const messages = [
      { id: 1, text: "Hello world" },
      { id: 2, text: "How are you?" },
    ];
    res.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}