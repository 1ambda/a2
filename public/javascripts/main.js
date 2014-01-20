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
		}
	});

	var A2Router = Backbone.Router.extend({
		routes : {
			'' : 'regionPage',
			'instance/:instance_id' : 'resourcePage',
			'logout' : 'logoutAction',
			'service' : 'servicePage',
			'alert' : 'alertPage',
			'region/:region' : 'regionPage',
			'service/:service_name' : 'specificServicePage',
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
			appView.instanceList.removeAll();

			// appView.arrow.template = _.template($('#tmpl_resource_arrow').html());
			appView.arrow.render('resource');
			appView.bow.removeAll();
			appView.resourceList.render(instance_id);
			$(document).foundation({
				orbit : {
					timer_speed : 5000,
					pause_on_hover : false, // Pauses on the current slide while hovering
					resume_on_mouseout : true,
				}
			});
			$(window).trigger('resize');
		},

		servicePage : function() {
			appView.serviceList.render();
			appView.arrow.render('service');
			appView.bow.render();
			$(document).foundation();
		},

		specificServicePage : function(service_name) {
			appView.instances.url = 'instances/service/' + service_name;
			appView.instanceList.render();
			appView.arrow.render('instance');
			appView.bow.render();
			$(document).foundation();
		},

		alertPage : function() {
		},

		regionPage : function(region) {
			if (region === undefined) {
				region = 'global';
			}

			appView.instances.url = '/instances/region/' + region;
			appView.instanceList.render();
			appView.arrow.render('instance');
			appView.bow.render();
			$(document).foundation();
		}
	});

	window.appView = new AppView();
	window.router = new A2Router();

	Backbone.history.start();
});

