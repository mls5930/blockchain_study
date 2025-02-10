const express = require('express');
const app = express();
require('dotenv').config();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware')
const router = require('./routes')

app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
});

app.use(cookieParser());
app.use(express.static('public'));

app.use(authMiddleware.attachAuthToken);
app.use(router);

app.listen(3005, () => {
  console.log('클라이언트 서버');
});
