$(document).ready(function() {

	window.AppView = Backbone.View.extend({
		initialize : function() {
			this.instances = new Instances();
			this.instanceList = new InstanceList({
				collection : this.instances
			});
			
			this.services = new Services();
			this.serviceList = new ServiceList({
				collection: this.services	
			});

		},
	});

	var appView = new AppView();

	var A2Router = Backbone.Router.extend({
		routes : {
			'' : 'regionPage',
			'logout' : 'logoutAction',
			'service' : 'servicePage',
			'alert' : 'alertPage',
			'region/:region' : 'regionPage',
		},

		logoutAction : function() {
			$.ajax({
				type : 'get',
				url : 'logout',
				success : function() {
					window.location.href = "/";
				}
			});
		},

		servicePage : function() {
			appView.services.reset(createDummyServices());
		},

		alertPage : function() {
		},

		regionPage : function(region) {
			appView.instances.reset(createDummyInstances());
		},
	});

	var appRouter = new A2Router();

	Backbone.history.start();
});

