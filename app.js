if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("KANBAN");
});

app.listen(port, () => {
  console.log(`Kanban App running at http://localhost:${PORT}`);
});
