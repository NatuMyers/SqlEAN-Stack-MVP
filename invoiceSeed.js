var models = require('./models');

var x;
var newInvoice1 = {
  email: 'danpetro7@gmail.com',
  username: 'dpetro07',
  password: 'password',
  fname: 'Daniel',
  type: 'producer',
  company:'Petro'
};

models.Invoice.create({
  email: 'danpetro7@gmail.com',
  username: 'dpetro07',
  password: 'password',
  fname: 'Daniel',
  type: 'producer',
  company:'Petro'
})
.then(function(result){

});


var newInvoice2 = {
  email: 'Jeremy@gmail.com',
  username: 'Jeremy',
  password: 'password',
  fname: 'Jeremy',
  type: 'producer',
  company:'Miragliotta'
};

models.Invoice.create(newInvoice2)
.then(function(result){

});


var newInvoice3 = {
  email: 'paul@gmail.com',
  username: 'paul',
  password: 'password',
  fname: 'Paul',
  type: 'producer',
  company:'Santos'
};

models.Invoice.create(newInvoice3)
.then(function(result){

});


var newInvoice4 = {
  email: 'darryl@gmail.com',
  username: 'Darryl',
  password: 'password',
  fname: 'Darryl',
  type: 'producer',
  company:'Mendonez'
};

models.Invoice.create(newInvoice4)
.then(function(result){

});


var newInvoice5 = {
  email: 'johndoe@gmail.com',
  username: 'johndoe',
  password: 'password',
  fname: 'John',
  type: 'producer',
  company:'Doe'
};

models.Invoice.create(newInvoice5)
.then(function(result){

});

var newInvoice6 = {
  email: 'janedoe@gmail.com',
  username: 'janedoe',
  password: 'password',
  fname: 'Jane',
  type: 'producer',
  company:'Doe'
};

models.Invoice.create(newInvoice6)
.then(function(result){

});


var newInvoice7 = {
  email: 'johnstockton@gmail.com',
  username: 'jstocks1',
  password: 'password',
  fname: 'John',
  type: 'producer',
  company:'Stockton'
};

models.Invoice.create(newInvoice7)
.then(function(result){

});


var newInvoice8 = {
  email: 'ironmike@gmail.com',
  username: 'ironmike',
  password: 'password',
  fname: 'Mike',
  type: 'producer',
  company:'Tyson'
};

models.Invoice.create(newInvoice8)
.then(function(result){

});


var newInvoice8 = {
  email: 'shamoons@gmail.com',
  username: 'shamoons',
  password: 'password',
  fname: 'Shamoon',
  type: 'producer',
  company:'Siddiqui'
};

models.Invoice.create(newInvoice8)
.then(function(result){

});


var newInvoice9 = {
  email: 'sconaty@gmail.com',
  username: 'exampleuser9',
  password: 'password',
  fname: 'Sean',
  type: 'producer',
  company:'Conaty'
};

models.Invoice.create(newInvoice9)
.then(function(result){

});

var newInvoice10 = {
  email: 'exampleuser10@gmail.com',
  username: 'exampleuser10',
  password: 'password',
  fname: 'Wolfgang',
  type: 'producer',
  company:'Hall'
};

models.Invoice.create(newInvoice10)
.then(function(result){

});


models.sequelize.sync();
