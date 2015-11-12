var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//applying the body parser package
app.use(bodyParser.urlencoded({extended:true}));

//loading public directory
app.use(express.static("public"));


//todo list array 
var todoList=[
	{
		_id: 1, 
		title: "clean the appartment", 
		dueDate: "Nov 15th at 5pm", 
		assignedTo: "zohar"
	}
];


//listen to the local server
var server = app.listen(3000, function(){
	console.log("listeniing");
});

//respond with the json format of todo list
app.get("/todos", function (req, res){

	res.json(todoList);
});

//posting a new todo list
app.post("/todos", function (req, res){

	var new_todo = req.body;

	//creat an id for the new to do
	if (todoList.length > 0) {
		new_todo._id = todoList[todoList.length-1]._id + 1;
	}
	else {
		new_todo._id = 1;
	}

	//push the new to do to the array
	todoList.push(new_todo);

	//respond with the updated list in json format
	res.json(todoList);
});

//search with id
app.get("/todos/:id", function (req,res){
 
 var todoId = parseInt(req.params.id);

 //return an array of elements with the requested Id
 var foundTodo = todoList.filter(function(todo){
 	return todo._id === todoId;
 });  

 res.json(foundTodo);

});

//update a todo
app.put("/todos/:id", function (req,res){

	var todoId = parseInt(req.params.id);

	var updatedTodo = todoList.filter(function(todo){
		return todo._id === todoId;
	})[0];

	//set the changes to the item
	updatedTodo.title = req.body.title;
	updatedTodo.dueDate = req.body.dueDate;
	updatedTodo.assignedTo = req.body.assignedTo;

	res.json(updatedTodo);
});

//delete a todo from the list
app.delete("/todos/:id", function (req,res){
	var todoId = parseInt(req.params.id);
	var deleteTodo = todoList.filter(function(todo){
		return todo._id === todoId;
	})[0];

	//delete the element from the todoList array
	todoList.splice(todoList.indexOf(deleteTodo),1);

	res.json(deleteTodo);
});
