var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var session = require('express-session');
var epilogue = require('epilogue');
var controller = require('../controllers/controller.js');
var models = require('../models');
var FacebookStrategy = require('passport-facebook').Strategy
var config = require('../configuration/config')

module.exports.routes = function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  epilogue.initialize({
    app: app,
    sequelize: models.sequelize
  });

  var itemResource = epilogue.resource({
    model: models.Item,
    endpoints: [
    '/api/items',
    '/api/items/:id'
    ],
    associations: true
  });

  var orderResource = epilogue.resource({
    model: models.Order,
    endpoints: [
    '/api/orders',
    '/api/orders/:id'
    ],
    associations: true
  });


  var itemResource = epilogue.resource({
    model: models.Item,
    endpoints: [
    '/api/items',
    '/api/items/:id'
    ],
    associations: true
  });

  var activityResource =  epilogue.resource({
    model: models.Activity,
    endpoints: [
    '/api/activities',
    '/api/activities/:id'
    ],
    associations: true
  });

  var commentResource =  epilogue.resource({
    model: models.Comment,
    endpoints: [
    '/api/comments',
    '/api/comments/:id'
    ],
    associations: true
  });

  var userResource =  epilogue.resource({
    model: models.User,
    endpoints: [
    '/api/users',
    '/api/users/:id'
    ],
    associations: true
  });

  app.get('/loginInfo', controller.getLogin);
  app.get('/logout', controller.logout);


  app.post('/login', passport.authenticate('local'), function(req, res) {
      res.json(req.user);
    }, function(err, req, res, next) {
      res.status(401).json(err);
    }
  );
  app.post('/signup', controller.signup);


  app.get('*', function(req, res) {
    debugger;
    console.log(req.user);
    res.sendFile(process.cwd() + '/public/views/index.html');
  });

  /*==========================================
    PASSPORTS
    ==========================================*/

  // ************** PASSPORT-LOCAL **************

  passport.serializeUser(function(user, done) {
    console.log('passport.serializeUser fired')
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    console.log('passport.deserializeUser fired')
    models.User.findOne({
      where: {
        id: id
      }
    }).then(function(user) {
      done(null, user);
    });
  });
  // use method as callback when being autheticated
  passport.use(new passportLocal.Strategy(function(username, password, done) {
    console.log('passportLocal fired')
    // check the password in database
    models.User.findOne({
      where: {username: username }
    }).then(function(user) {
      // console.log(user.id);
      // check the password against the hash
      if(user) {
        bcrypt.compare(password, user.password, function(err, userlogin) {
          if(userlogin) {
            // if password is valid -- authenticate the user with cookie
            done(null, { id: user.id, username: user.username, firstname: user.fname });
          }
          else {
            done(null, null);
          }
        });
      } else {
        done("NO USE FOUND");
      }
    });
  })); // end passport-local

  // ************** PASSPORT-FACEBOOK **************

  /*config is our configuration variable.*/
  passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        if(config.use_database==='true')
        {
           //Further code of Database.
         }
         return done(null, profile);
       });
  }
  ));

  app.get('/account', ensureAuthenticated, function(req, res){
    res.render('account', { user: req.user });
  });
  //Passport Router
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
     successRedirect : '/',
     failureRedirect: '/login'
   }),
    function(req, res) {
      res.redirect('/');
    });
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  } // end passport-facebook

}; // end module.exports.routes
