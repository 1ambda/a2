$(document).ready(function() {

	window.Instance = Backbone.Model.extend({

	});

	window.Instances = Backbone.Collection.extend({
		model : Instance
	});

	window.InstanceItem = Backbone.View.extend({
		tagName : 'tr',
		template : _.template($('#tmpl_instance_item').html()),

		events : {
			'click' : 'itemClick'
		},

		render : function() {
			var tmpl = this.template(this.model.toJSON());
			$(this.el).html(tmpl);

			return this;
		},

		itemClick : function() {
			alert(JSON.stringify(this.model.toJSON()));
		}
	});

	window.InstanceList = Backbone.View.extend({
		el : $('#target'),
		template : _.template($('#tmpl_instance_list').html()),

		initialize : function() {
			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.addAll, this);
		},

		render : function() {
			var tmpl = this.template();
			$(this.el).html(tmpl);
			this.addAll();
			return this;
		},

		addOne : function(item) {
			var view = new InstanceItem({
				model : item
			});
			this.$('tbody').append(view.render().el);
		},

		addAll : function() {
			this.$('tbody').html('');
			this.collection.each(this.addOne);
		}
	});

	window.Service = Backbone.Model.extend({

	});

	window.Services = Backbone.Collection.extend({
		model : Service
	});

	window.ServiceItem = Backbone.View.extend({
		tagName : 'tr',
		template : _.template($('#tmpl_service_item').html()),
		events : {
			'click' : 'itemClick'
		},

		render : function() {
			var tmpl = this.template(this.model.toJSON());
			$(this.el).html(tmpl);
			return this;
		},

		itemClick : function() {
			alert(JSON.stringify(this.model.toJSON()));
		}
	});

	window.ServiceList = Backbone.View.extend({
		el : $('#target'),

		template : _.template($('#tmpl_service_list').html()),

		initialize : function() {
			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.addAll, this);
		},

		render : function() {
			var tmpl = this.template();
			$(this.el).html(tmpl);
			this.addAll();
			return this;
		},

		addOne : function(item) {
			var view = new ServiceItem({
				model : item
			});
			this.$('tbody').append(view.render().el);
		},

		addAll : function() {
			this.$('tbody').html('');
			this.collection.each(this.addOne);
		}
	});

	window.AppView = Backbone.View.extend({
		initialize : function() {
			this.instances = new Instances();
			this.instanceList = new InstanceList({
				collection : this.instances
			});

			this.instances.add(createDummyInstances());
			this.instanceList.render();

			this.services = new Services();
			this.serviceList = new ServiceList({
				collection : this.services
			});
			this.services.add(createDummyServices());
		},
	});

	var appView = new AppView();

	var A2Router = Backbone.Router.extend({
		routes : {
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
			appView.instanceList.render();
		},
	});

	var appRouter = new A2Router();

	Backbone.history.start();
});

function createDummyInstances() {
	return [{
		service_name : "T Cloud",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "T Store",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "T Map",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "One ID",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "61.132.14.51",
		security_group : "default"
	}, {
		service_name : "One ID",
		instance_id : "da24lf-foql912",
		instance_type : "m1",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "54.130.214.51",
		security_group : "default"
	}, {
		service_name : "PCS",
		instance_id : "af01lf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}];
};

function createDummyServices() {
	return [{
		service_name : "One ID",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "Hoppin",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "T Cloud",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "OCB",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}];
};

