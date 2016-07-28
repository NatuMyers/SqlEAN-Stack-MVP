var models = require('./models');

var newItem1 = {
  title: 'Adventure Time!',
  city: 'New York City',
  state: 'NY',
  country: 'USA',
  UserId: 1,
  description: 'put description here'
};

models.Item.create(newItem1)
.then(function(result){

});

var newItem2 = {
  title: 'Time for another adventure!',
  city: 'Jersey City',
  state: 'NJ',
  country: 'USA',
  UserId: 1
};


models.Item.create(newItem2)
.then(function(result){

});

var newItem3 = {
  title: 'Beach time!',
  city: 'Miami',
  state: 'FL',
  country: 'USA',
  UserId: 1
};


models.Item.create(newItem3)
.then(function(result){

});

var newItem4 = {
  title: 'Camping Trip',
  city: 'Catskill',
  state: 'NY',
  country: 'USA',
  UserId: 1
};


models.Item.create(newItem4)
.then(function(result){

});

var newItem5 = {
  title: 'Surfing!',
  city: 'Juno',
  state: 'AK',
  country: 'USA',
  UserId: 1
};


models.Item.create(newItem5)
.then(function(result){

});

var newItem6 = {
  title: 'Motorcycle Trip!',
  city: 'Los Angeles',
  state: 'CA',
  country: 'USA',
  UserId: 1
};


models.Item.create(newItem6)
.then(function(result){

});

var newItem7 = {
  title: 'Museums',
  city: 'New York City',
  state: 'NY',
  country: 'USA',
  UserId: 1
};


models.Item.create(newItem7)
.then(function(result){

});

models.sequelize.sync();
