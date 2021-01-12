// if (process.env.NODE_ENV == 'development') {
//   require('dotenv').config()
// }

const expres = require('express')
const errorHandlers = require('./middlewares/errorHandlers')
const cors = require('cors')
const app = expres()
const PORT = process.env.PORT || 3000
const router = require('./routes')

app.use(cors())
app.use(expres.urlencoded({extended: true}))
app.use(expres.json())
app.use(router)
app.use(errorHandlers)

app.get('/', (req, res) => {
  res.send('Home My Kamban app')
})

app.listen(port, (req, res) => {
  console.log('This app running well on port', PORT);
})