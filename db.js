var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname + '/data/dev-todo-api.sqlite'
});

// create an empty db object.
var db = {}; 

// todo property of the db object, .import(); lets u import different models
db.todo = sequelize.import(__dirname + '/models/todo.js'); 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// to access any functions within this object.
module.exports = db; 