$(document).ready(function() {
	
	window.AppView = Backbone.View.extend({
		el : 'body',
		events : {
			'keyup' : 'shortCut'
		},

		shortCut : function(e) {
			var bow = $('input', '#bow');
			var reset = $('#reset', '#bow');

			if (!$(bow).is(':focus')) {
				switch(e.which) {
					case 68:
						$(bow).val('');
						break;
					case 69:
						$(bow).focus();
						break;
					case 82:
						$(reset).trigger('click');
						break;
				}
			}
		},

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
			
			this.cpuView = new CpuView();
			

			this.arrow = new ArrowView();
			this.bow = new BowView();
			this.target = new Target();
		}
	});

	var A2Router = Backbone.Router.extend({
		routes : {
			'' : 'regionPage',
			'instance/:instance_id' : 'resourcePage',
			'instance/:instance_id/:type' : 'specificResourcePage',
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
			
			appView.target.render(appView.resourceList, undefined, instance_id);
			appView.arrow.render('resource', instance_id);
			appView.bow.removeAll();
		},
		
		specificResourcePage: function(instance_id, resource_type) {
			appView.arrow.render('resource', instance_id);
			appView.bow.removeAll();
			
			var hash = '#instance/' + instance_id + '/' + resource_type;
			var link = $('a[href*="' + hash + '"');
			$('.resource-tab').parent('dd').removeClass('active');
			$(link).parent('dd').addClass('active');
			
			appView.target.render(appView.cpuView, null, instance_id);
			
		},

		servicePage : function() {
			appView.target.render(appView.serviceList);
			appView.arrow.render('service');
			appView.bow.render();
		},

		specificServicePage : function(service_name) {
			var url = 'instances/service/' + service_name;
			appView.target.render(appView.instanceList, url);
			appView.arrow.render('instance');
			appView.bow.render();
		},

		alertPage : function() {
		},

		regionPage : function(region) {
			if (region === undefined) {
				region = 'global';
			}

			var url = '/instances/region/' + region;
			appView.target.render(appView.instanceList, url);			
			appView.arrow.render('instance');
			appView.bow.render();
		}
	});

	window.appView = new AppView();
	window.router = new A2Router();

	Backbone.history.start();
});

