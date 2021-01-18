if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const router = require("./routers")
const errorHandler = require("./middlewares/errorHandler")
const cors = require("cors")
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", router)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})