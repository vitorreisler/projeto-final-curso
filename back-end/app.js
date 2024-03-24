require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const chalk = require("chalk");
const rateLimitMw = require("./middlewere/rateLimiter.js");

const app = express();
mongoose
  .connect(process.env.MONGO_URI_ATLAS || process.env.MONGO_URI)
  .then(console.log(chalk.bgGreen("connected to DB")))
  .catch((err) => console.log(chalk.bgRed(`Could not connect to db ${err}`)));

app.use(rateLimitMw); 
app.use(require("cors")());
app.use(morgan(":method :url :status :date - :response-time ms"));
app.use(express.json());

app.use("/api/users", require("./routes/users.routes"));
app.use("/api/products", require("./routes/products.routes"));

const PORT = process.env.PORT || 8080; 

app.listen(PORT, () => console.log(`Listening on port ${PORT}`)); 
