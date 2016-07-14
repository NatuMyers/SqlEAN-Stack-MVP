var models = require('./models');

//ACTIVITIES 
var newActivity = {
  name: 'Basketball',
  ItineraryId: 1
};

models.Activity.create(newActivity)
.then(function(result){

});


var newActivity1 = {
  name: 'Basketball',
  ItineraryId: 1
};

models.Activity.create(newActivity1)
.then(function(result){

});
//asdf


var newActivity2 = {
  name: 'Skydiving',
  ItineraryId: 2
};

models.Activity.create(newActivity2)
.then(function(result){

});


var newActivity3 = {
  name: 'Surfing',
  ItineraryId: 3
};

models.Activity.create(newActivity3)
.then(function(result){

});








// //Itinerary





models.sequelize.sync();