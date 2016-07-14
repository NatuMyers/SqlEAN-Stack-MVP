var models = require('./models');

//ACTIVITIES 
var newActivity = {
  name: 'Basketball',
  ItemId: 1
};

models.Activity.create(newActivity)
.then(function(result){

});


var newActivity1 = {
  name: 'Basketball',
  ItemId: 1
};

models.Activity.create(newActivity1)
.then(function(result){

});
//asdf


var newActivity2 = {
  name: 'Skydiving',
  ItemId: 2
};

models.Activity.create(newActivity2)
.then(function(result){

});


var newActivity3 = {
  name: 'Surfing',
  ItemId: 3
};

models.Activity.create(newActivity3)
.then(function(result){

});








// //Item





models.sequelize.sync();