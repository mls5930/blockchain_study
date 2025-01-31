const express = require('express');
const webSocket = require('./socket');
const app = express();

app.use(express.json());

const http = app.listen(3000, () => {
  console.log('server open');
});

webSocket(http);
