if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
var cors = require('cors');
const PORT = process.env.PORT || 3000;
const indexRouter = require("./routes");
const errorHandler = require("./middlewares/errorHandler.js");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Kanban App running at http://localhost:${PORT}`);
});
