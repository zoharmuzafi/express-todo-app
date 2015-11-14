$(function() {
	console.log("JS is ready");
	var source = $("#listOfTodos").html();
	var template = Handlebars.compile(source);
	var tasks=[];

	//create list of tasks
	function createList(){
		task = $.get("/todos", function(data){
			tasks = data;
			var appended = template({todo:tasks.todoList});
			$("#tasksList").append(appended);
		});
	}

	//new task button
	$("#newTask").click(function(event){
		event.preventDefault();
		$("#formDiv").toggle();
	});

	//post 
	$("form").submit(function(event){
		event.preventDefault();
		var data = $("form").serialize();
		$("#formDiv").css("display", "none");
		$.post("/todos", data, function(){
			$("#tasksList").empty();
			$(".form-control").val("");
			createList();
		});
	});

	//delete
	$("#tasksList").on("click", ".delete", function(event){
		event.preventDefault();
		var itemId = $(this).attr("data_id");
		$.ajax({
			type: "DELETE",
			url: "/todos/" + itemId,
			success: function(data){
				$("#tasksList").empty();
				createList();
				console.log(data.title + "Deleted");
			},
			error: function(error){
				console.log(error);
			}
		});
	});

	//update
	$("#tasksList").on("click", ".edit", function(event){
		event.preventDefault();
		var itemId = $(this).attr("id");
		if(!itemId){return;}
		$("#editForm"+itemId).toggle();
		console.log(itemId);
		$(".editForm").submit(function(event){
			$("#editForm"+itemId).toggle();
			event.preventDefault();
			var ItemToUpdate = $(this).serialize();
			$.ajax({
				type: "PUT",
				url: "/todos/" + itemId,
				data: ItemToUpdate,
				success: function(data){
					console.log("updated");
					$("#tasksList").empty();
					createList();
				},
				error: function(error){
					console.log(error);
				}
			});
		});		
	});
	createList();
});

