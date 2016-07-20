var models = require('./models');

var x;
var newUser1 = {
  email: 'danpetro7@gmail.com',
  username: 'dpetro07',
  password: 'password',
  fname: 'Daniel',
  company:'Petro'
};

models.User.create({
  email: 'danpetro7@gmail.com',
  username: 'dpetro07',
  password: 'password',
  fname: 'Daniel',
  company:'Petro'
})
.then(function(result){

});


var newUser2 = {
  email: 'Jeremy@gmail.com',
  username: 'Jeremy',
  password: 'password',
  fname: 'Jeremy',
  company:'Miragliotta'
};

models.User.create(newUser2)
.then(function(result){

});


var newUser3 = {
  email: 'paul@gmail.com',
  username: 'paul',
  password: 'password',
  fname: 'Paul',
  company:'Santos'
};

models.User.create(newUser3)
.then(function(result){

});


var newUser4 = {
  email: 'darryl@gmail.com',
  username: 'Darryl',
  password: 'password',
  fname: 'Darryl',
  company:'Mendonez'
};

models.User.create(newUser4)
.then(function(result){

});


var newUser5 = {
  email: 'johndoe@gmail.com',
  username: 'johndoe',
  password: 'password',
  fname: 'John',
  company:'Doe'
};

models.User.create(newUser5)
.then(function(result){

});

var newUser6 = {
  email: 'janedoe@gmail.com',
  username: 'janedoe',
  password: 'password',
  fname: 'Jane',
  company:'Doe'
};

models.User.create(newUser6)
.then(function(result){

});


var newUser7 = {
  email: 'johnstockton@gmail.com',
  username: 'jstocks1',
  password: 'password',
  fname: 'John',
  company:'Stockton'
};

models.User.create(newUser7)
.then(function(result){

});


var newUser8 = {
  email: 'ironmike@gmail.com',
  username: 'ironmike',
  password: 'password',
  fname: 'Mike',
  company:'Tyson'
};

models.User.create(newUser8)
.then(function(result){

});


var newUser8 = {
  email: 'shamoons@gmail.com',
  username: 'shamoons',
  password: 'password',
  fname: 'Shamoon',
  company:'Siddiqui'
};

models.User.create(newUser8)
.then(function(result){

});


var newUser9 = {
  email: 'sconaty@gmail.com',
  username: 'exampleuser9',
  password: 'password',
  fname: 'Sean',
  company:'Conaty'
};

models.User.create(newUser9)
.then(function(result){

});

var newUser10 = {
  email: 'exampleuser10@gmail.com',
  username: 'exampleuser10',
  password: 'password',
  fname: 'Wolfgang',
  company:'Hall'
};

models.User.create(newUser10)
.then(function(result){

});


models.sequelize.sync();