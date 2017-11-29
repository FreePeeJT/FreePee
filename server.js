const http = require("http");
var express = require("express");
var app = express();
var cfenv = require("cfenv");
const path = require('path');

var bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const httpServer = http.createServer(app);
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport');


require("dotenv").config();

//mongoose stuff

const User = require("./models/user");
const Spot = require("./models/spot");

// parse application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URL_ONLINE, { useMongoClient: true })
  .catch(err => {
    console.error(err);
  });
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection
});

app.use(session({
  //TODO Look further into sessions
  store: sessionStore,
  secret: process.env.SESSION_KEY,
  resave: false, //don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  unset: 'destroy', //Remove session from sessionStore when user deserializes
})
);
app.use(passport.initialize());
app.use(passport.session());
// parse application/json
app.use(bodyParser.json());




  
//serve static file (index.html, images, css)
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
  passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
      User.findOneOrCreate({email: profile.email}, {
          displayName: profile.displayName,
          email: profile.email,
          googleId: profile.id
      }, function (err, user) {
          let dataForSession = {
              uid: user._id
              
          };
          done(null, dataForSession);
      });
  } 

));
passport.serializeUser(function (userId, done) {
done(null, userId);
});
passport.deserializeUser(function (userId, done) {
done(null, userId);
});


app.use('/', require("./routes/main"));
app.use('/api', require("./routes/api"));
app.use("/auth", require("./routes/authenticate"));


/**
 * Any other routes return 404
 */
app.get("*", function (req, res) {
  res.status(404).render("error", {
      title: "404 Not Found",
      error: "Your URL is incorrect."
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(
    "To view your app, open this link in your browser: http://localhost:" + port
  );
});
