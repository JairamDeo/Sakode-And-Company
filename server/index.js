// /index.js
const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// MongoDB connection
const mongoDB = require("./db");
mongoDB();

const FrontendURL = process.env.FRONTEND_URL;

// Middleware CORS handling
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FrontendURL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({ origin: FrontendURL, credentials: true }));

app.use(express.json()); // Parse incoming JSON requests
app.use(express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Serve React build files

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });


// Routes
app.use('/api/sarees', require("./routes/sarees"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
