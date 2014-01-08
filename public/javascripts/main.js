$(document).ready(function() {
	var A2Router = Backbone.Router.extend({
		routes : {
			'logout' : 'logout'
		},

		logout : function() {
			$.ajax({
				type : 'get',
				url : 'logout',
				success : function() {
					window.location.href = "/";
				}
			});
		}
	});

	var appRouter = new A2Router();



	Backbone.history.start();
});
