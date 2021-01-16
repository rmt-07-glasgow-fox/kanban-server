if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', function (socket) {
  socket.on('UPDATE_TASK', function (data) {
    io.emit('TASKS', data);
  });
});
