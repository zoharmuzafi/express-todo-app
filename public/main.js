$(function() {
console.log("JS is ready");
var source = $("#listOfTodos").html();
var template = Handlebars.compile(source);
var tasks=[];

task = $.get("/todos", function(data){
	tasks = data;

	var appended = template({todo:tasks.todoList});
	console.log(tasks);
	console.log(appended);
	$("#tasksList").append(appended);

	});

$("#newTask").click(function(event){
	event.preventDefault();
	$("#formDiv").toggle();
});
});