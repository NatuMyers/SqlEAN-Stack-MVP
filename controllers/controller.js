var models = require('../models');
var request = require('request');

exports.home = function(req, res, next) {
  res.sendFile(process.cwd() + '/public/views/index.html');
}

exports.signup = function(req, res, next){
  var newUser = req.body;
  models.User.create(newUser)
  .then(function(result){
    res.redirect('/?msg=New User Created!');
    }).catch(function(err){
      console.log(err);
      res.redirect('/msg=Something Went Wrong! Please Try Again');
    });
  };

exports.getLogin = function(req, res, next) {
  res.json(req.user);
}

exports.logout = function(req, res, next) {
  console.log('logout function fired');
  req.session.destroy(function(err) {
    res.json();
  });
}

// ************** PASSPORT-FACEBOOK **************

exports.saveOAuthUserProfile = function(req, profile, done) {
    User.findOne({
            provider: profile.provider,
            providerId: profile.providerId
        },
        function(err, user) {
            if (err) {
            return done(err);
            }
            else {
                if (!user) {
                    var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                    User.findUniqueUsername(possibleUsername, null, function(availableUsername) {
                        profile.username = availableUsername;
                        user = new User(profile);

                        user.save(function(err) {
                            if (err) {
                                var message = _this.getErrorMessage(err);
                                req.flash('error', message);
                                return res.redirect('/signup');
                            }

                            return done(err, user);
                        });
                    });
                }
                else {
                    alert('facebook login successful');
                    return done(err, user);
                }
            }
        }
    );
};
