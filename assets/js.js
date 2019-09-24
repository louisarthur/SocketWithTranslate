$(document).ready(function(){  
    var socket = io.connect("http://localhost:3000");
    var ready = false;

    $("#submit").submit(function(e) {
		e.preventDefault();
		$("#nick").fadeOut();
		$("#chat").fadeIn();
		var name = $("#nickname").val();
		//var time = new Date();
		//$("#name").html(name);
		//$("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

		ready = true;
		socket.emit("join", name);

	});

	$("#textarea").keypress(function(e){
        if(e.which == 13) {
			var text = $("#textarea").val();
			var origem = $("#idiomaOrig").val();
			var destino = $("#idiomaTran").val();		
					socket.emit("send", text, origem, destino);
			
        }
	});
	
	socket.on("translate", function(msg) {
		$("#textTranslated").html(msg);
	})

});

