const path = require("path")
const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require("morgan");
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require("express-session");
const passport=require('passport')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
const fileUpload = require('express-fileupload');
// const flash = require('express-flash');
const flash = require('connect-flash');

// const createError = require("http-errors");
const app = express();





// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)
require('./config/passport-local')(passport)

//connect database
connectDB()

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.use(flash())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: __dirname + "/views/partials/"
  })
)

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {maxAge: 1000 * 60 * 60 * 168}
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Global Vars
app.use((req, res, next)=>{
res.locals.success_msg=req.flash('success_msg');
res.locals.error_msg=req.flash('error_msg');
res.locals.error=req.flash('error');
next();
})

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

//static folder
app.use(express.static(path.join(__dirname, "public")));

//Route Calling
app.use('/', require('./routes/index'))
app.use('/signup', require('./routes/signup'))
app.use('/auth', require('./routes/auth'))
app.use("/clientprofile", require('./routes/client/client-profile'))
app.use("/clientquotereq",  require('./routes/client/client-quotereq'));

//portlistener
const PORT = process.env.PORT || 3000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)

// const createError = require("http-errors");
// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

module.exports = app;
