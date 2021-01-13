if (process.env.NODE_ENV == `development`) {
  require
}

const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3000
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})
