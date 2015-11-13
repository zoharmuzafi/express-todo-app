var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//require mongoose package and connect the mango db
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/todo");

//reqiure the models->todo
var Todo = require("./models/todo");


//applying the body parser package
app.use(bodyParser.urlencoded({extended:true}));

//loading public directory
app.use(express.static(__dirname + "/public"));


//listen to the local server
var server = app.listen(process.env.PORT || 3000, function(){
	console.log("listeniing");
});

app.set("view engine", "hbs");

//respond with the json format of todo list
app.get("/", function (req, res){
		res.render("index");
});

//respond with the json format of todo list
app.get("/todos", function (req, res){
	
	Todo.find(function(err, todo){
		console.log(todo);

		res.json({todoList:todo});
	});
});

//posting a new todo list
app.post("/todos", function (req, res){

	//craete a new todo followig the schima
	var new_todo = new Todo(req.body);

	//save new todo in the DB
	new_todo.save(function(err, savedTodo){

	//respond with the updated list in json format
		res.json(savedTodo);
	});
});

//search with id  
app.get("/todos/:id", function (req,res){
 
 	var TodoId = req.params.id;

 	Todo.findOne({_id: TodoId}, function(err, foundItem){
 	res.json(foundItem);	
 	});
});


//update a todo
app.put("/todos/:id", function (req,res){

	var TodoId = req.params.id;
	Todo.findOne({_id: TodoId}, function(err, itemToUpdate){

		itemToUpdate.title = req.body.title;
		itemToUpdate.dueDate = req.body.dueDate;
		itemToUpdate.assignedTo = req.body.dueDate;
		res.json(itemToUpdate);
	});
});

//delete a todo from the list
app.delete("/todos/:id", function (req,res){
	var TodoId = req.params.id;
	Todo.findOneAndRemove({_id: TodoId}, function(err, deletedItem){
		res.json(deletedItem);
	});
	
});



