if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const router = require("./routers")
const errorHandler = require("./middlewares/errorHandler")
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended: false}))
app.use("/", router)

app.use(errorHandler)
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})