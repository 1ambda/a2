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

			this.resources = new Resources();
			this.resourceList = new ResourceList({
				collection : this.resources
			});

			this.arrow = new ArrowView();
			this.bow = new BowView();
		},
	});

	var appView = new AppView();

	var A2Router = Backbone.Router.extend({
		routes : {
			'' : 'regionPage',
			'instance/:instance_id' : 'resourcePage',
			'logout' : 'logoutAction',
			'service' : 'servicePage',
			'alert' : 'alertPage',
			'region/:region' : 'regionPage',
			'service/:service_name' : 'specificServicePage'
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

		resourcePage : function(instance_id) {
			appView.instances.url = 'instance/' + instance_id;
			appView.instanceList.removeAll();
			appView.arrow.render();
			appView.bow.removeAll();
			appView.resourceList.render();
		},
		
		

		servicePage : function() {
			appView.serviceList.render();
			appView.arrow.render();
			appView.bow.render();
		},

		specificServicePage : function(service_name) {
			appView.instances.url = 'instances/service/' + service_name;
			appView.instanceList.render();
			appView.arrow.render();
			appView.bow.render();
		},

		alertPage : function() {
		},

		regionPage : function(region) {
			if (region === undefined) {
				region = 'global';
			}

			appView.instances.url = '/instances/region/' + region;
			appView.instanceList.render();
			appView.arrow.render();
			appView.bow.render();
		},
	});

	var appRouter = new A2Router();
	window.router = appRouter;

	Backbone.history.start();
});

