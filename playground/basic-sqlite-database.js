var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
	'dialect': 'sqlite',
	'storage': __dirname +'/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync({
	//force: true // used to wipe all the data and startover.
}).then(function () {
	console.log('Everything is synced');

	Todo.findById(3).then(function (todo) {
		if(todo) {
			console.log(todo.toJSON());
		} else {
			console.log('no data found');
		}
	});

	// Todo.create({
	// 	description: 'Walking the dog'
	// 	//completed: false
	// }).then(function(todo){
	// 	return Todo.create({
	// 		description: 'Clean the office'
	// 	});
	// }).then(function(){
	// 	//return Todo.findById(1) // OR
	// 	return Todo.findAll({
	// 		where: {
	// 			description: {
	// 				$like: '%office%'
	// 			}
	// 		}
	// 	});
	// }).then(function(todos){
	// 	if(todos) {
	// 		todos.forEach(function (todo){
	// 			console.log(todo.toJSON());
	// 		});
	// 	} else {
	// 		console.log('no todo found!');
	// 	}
	// }).catch(function (e) {
	// 	console.log(e);
	// });
}); 
