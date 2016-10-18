var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

// Middleware
app.use(bodyParser.json());


// GET /
app.get('/', function (req, res) {
	res.send('Todo API Root');
});


// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res){

	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	

	if(matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

// POST /todos
app.post('/todos', function(req,res) {
	// a validation to keep only 'description' and 'completed' from the entire object, if any.
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	// removing the spaces
	body.description = body.description.trim();

	body.id = todoNextId++;

	todos.push(body);

	res.json(body);
})


// Setting the Port to listen
app.listen(PORT, function() {
	console.log('The Server is Running at port ' + PORT);
});






