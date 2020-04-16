const path  = require('path');
const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config');
// const authRoutes = require('./api/auth');
// const categoryRoutes = require('./api/category');
// const incomeRoutes = require('./api/financialHistory');
const app = express();

app.use(passport.initialize());
require('./middleware/passport.js')(passport);

// app.use('/api/auth', authRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/financialHistory', incomeRoutes);
app.use(express.static(path.join(__dirname, '/public'))); //path statics
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || config.PORT;

(function start(){
  try {
    mongoose.connect(config.mongoURL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        findByIdAndUpdate: true
      });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.info('MongoDB conected');
    });

    app.listen(PORT, () => {
      console.info(`Server is runing on ${PORT}`);
    })
  } catch (error) {
    console.log(error);
  }
})();

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});
