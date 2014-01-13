$(document).ready(function() {

	window.AppView = Backbone.View.extend({
		initialize : function() {
			this.instances = new Instances();
			this.instanceList = new InstanceList({
				collection : this.instances
			});

			this.services = new Services();
			this.serviceList = new ServiceList({
				collection : this.services
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
			appView.serviceList.render();
		},

		alertPage : function() {
		},

		regionPage : function(region) {
			if (region === undefined) {
				region = 'global';
			}
			
			appView.instances.url = '/instances/' + region;
			appView.instanceList.render();
		},
	});

	var appRouter = new A2Router();
	Backbone.history.start();
});

