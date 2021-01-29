if(process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')

const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 3000
const app = express()

const server = require('http').createServer(app)
const io = require('socket.io')(server)

let clientSocket

io.on('connection', (socket) => {
  socket.on('updateKanban', function () {
    socket.broadcast.emit('updateKanban')
  })
})

app.use(cors())
// json raw
app.use(express.json())
// body urlencoded
app.use(express.urlencoded({extended: true}))

// routes
app.use(router)
app.use(errorHandler)

server.listen(PORT, _ => console.log(`Server is running on ${PORT}`))
