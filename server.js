var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var session = require("express-session");
var PORT = process.env.PORT || 8080;

var Sequelize = require("sequelize");
var sequelize = new Sequelize('mydb', 'root', 'qicsand1167661');

var passport = require('passport');
var passportLocal = require('passport-local');

// create new user in db
var Purchaser = sequelize.define('purchaser', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
       type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: function(input){
      input.password = bcrypt.hashSync(input.password, 10);
    }
  }
});

var Producers = sequelize.define('producer', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
       type: Sequelize.STRING,
    allowNull: false
  }
}, {
  //create password hash
  hooks: {
    beforeCreate: function(input){
      input.password = bcrypt.hashSync(input.password, 10);
    }
  }
});
//Sequelize link purchaser to producers
Purchaser.hasMany(Producers);

var app = express();
//get css,js, or images from files in public folder
app.use(express.static(process.cwd() + '/public'));
app.use(session({
  secret: "my super secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 *30
  },
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//Producers authentication
passport.use("producer", new passportLocal.Strategy(
  function(username, password, done) {
    //Check password in DB
    Producers.findOne({
      where:{
        username: username
      }
    }).then(function(user){
      //check password against hash
      if(user){
        bcrypt.compare(password, user.dataValues.password, function(err, user){
          if(user){
            //if password is correct authenticate the user with cookie
            done(null, {id: username, username:username});
          }else{
            done(null,null);
          }
        });
      }else {
        done(null, null);
      }
    });
  }));
//Purchaser auth
passport.use("purchaser", new passportLocal.Strategy(
  function(username, password, done) {
    debugger;
    //Check password in DB
    Purchaser.findOne({
      where:{
        username: username
      }
    }).then(function(user){
      //check password against hash
      if(user){
        bcrypt.compare(password, user.dataValues.password, function(err, user){
          if(user){
            //if password is correct authenticate the user with cookie
            done(null, {id: username, username:username});
          }else{
            done(null,null);
          }
        });
      }else {
        done(null, null);
      }
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, { id: id, username: id })
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.get("/", function(req, res){
  Purchaser.findAll({}).then(function(purchaser){
    res.render("register", {purchaser});
  });
});
// { msg: req.query.msg}
app.post("/register", function(req,res){
  // })
  //place new user in either producer or purchaser table
  if(req.body.status === "producer"){
    Producers.create(req.body).then(function(result){
    res.render("producers", {result});
    }).catch(function(err) {
    console.log(err);
    res.redirect('/?msg=' + err.errors[0].message);
    });
  } else {
    Purchaser.create(req.body).then(function(result){
    res.render("purchasers", {result});
    }).catch(function(err) {
    console.log(err);
    res.redirect('/?msg=' + err.errors[0].message);
    });
  }
});

app.get("/login", function(req, res){
  res.render("login");
});


app.get("/user/:id", function(req, res){
  debugger;
  Purchaser.findAll({
    include: [{
      model: Producers
    }]
  }).then(function(purchasers){
    console.log(purchasers);
    res.render("purchasers",{
      purchasers:purchasers
    })
});


app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/');
  // res.render("logout");
});

app.get("/producers", function(req, res){
  res.render("producers");
});

app.get("/purchasers", function(req, res){
  debugger;
  Purchaser.findAll({
    include: [{
      model: Producers
    }]
  }).then(function(purchasers){
    console.log(purchasers);
    res.render("purchasers",{
      purchasers:purchasers
    })
  });



  // User.findOne({ where: {username: req.body.username} }).then(function(result){
  //   if(result.password === req.body.password){
  //     res.send("You're In");
  //   } else {
  //     res.send("no match found");
  //   }
  // });
});



app.get('/users/:username/',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the  user.
    res.redirect('/users/' + req.user.username);
  });


//query the db to see if user is producer or purchaser and render correct page
app.post("/login", function(req,res){
  if(req.body.status === "producer"){
    debugger
    passport.authenticate('producer', {
      successRedirect('/users/' + req.user.username),
      // successRedirect: "/producers",
      failureRedirect: "/login"
    });
  } else {
    passport.authenticate('purchaser', {
      successRedirect('/users/' + req.user.username),
      // successRedirect: "/purchasers",
      failureRedirect: "/login"
    });
  };




/*
app.post('/login')
    .get(function(req, res) {
        res.render('login');
    })
    .post(passport.authenticate('local', { successRedirect: '/dashboard',
            failureRedirect: '/login' });
    );
*/

  // User.findOne({ where: {username: req.body.username} }).then(function(result){
  //   if(result.password === req.body.password){
  //     res.send("You're In");
  //   } else {
  //     res.send("no match found");
  //   }
  // });
});

sequelize.sync().then(function() {
  app.listen(PORT, function(){
    console.log("listening on port %s", PORT);
  });
});
