var createError = require('http-errors');
var express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./config/database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var bukuRouter = require('./routes/bukuRoutes');
var peminjamanRouter = require('./routes/peminjamanRoutes');
var indexRouter = require('./routes/index');
dotenv.config();
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRouter);
app.use('/buku', bukuRouter);
app.use('/', indexRouter);
app.use('/peminjaman', peminjamanRouter);
app.use('/users', usersRouter);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000; 0
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
