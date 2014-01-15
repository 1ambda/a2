window.RenderedService = Backbone.Model.extend({

});

window.RenderedServices = Backbone.Collection.extend({
	model : RenderedService
});

window.Service = Backbone.Model.extend({

});

window.Services = Backbone.Collection.extend({
	model : Service,
	url : '/instances/region/global'
});

window.ServiceItem = Backbone.View.extend({
	tagName : 'tr',
	// className : 'centered-text',
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
		window.router.navigate('service/' + this.model.get('service_name'), {
			trigger : true
		});
	}
});

window.ServiceList = Backbone.View.extend({
	el : $('#target'),
	template : _.template($('#tmpl_service_list').html()),

	initialize : function() {
		this.rendered = new RenderedServices();
		this.listenTo(this.collection, 'reset', this.filter);
		this.listenTo(this.rendered, 'reset', this.addAll);
		this.views = [];
		this.service_names = [];
		this.services = [];
	},

	render : function() {
		var tmpl = this.template();
		$(this.el).html(tmpl);

		this.removeAll();
		this.collection.fetch({
			reset : true
		});
	},

	addOne : function(item) {
		var view = new ServiceItem({
			model : item
		});

		this.views.push(view);
		this.$('tbody').append(view.render().el);
	},

	addAll : function() {
		this.rendered.each(this.addOne, this);
	},
	
	filter : function() {
		this.service_names = this.collection.pluck('service_name');

		_.each(this.service_names, function(item) {
			var list = this.collection.where({
				service_name : item
			});
			this.services.push({
				list : list,
				service_name : item,
				instance_number : 0,
				running : 0,
				pending : 0,
				stopped : 0,
				terminated : 0
			});

		}, this);

		_.each(this.services, function(services) {
			_.each(services.list, function(item) {
				services.instance_number++;
				switch(item.get('instance_state')) {
					case 'running' :
						services.running++;
						break;
					case 'pending' :
						services.pending++;
						break;
					case 'stopped' :
						services.stopped++;
						break;
					case 'terminated' :
						services.terminated++;
						break;
				};
			});
		}, this);

		var models = [];

		_.each(this.services, function(services) {
			var model = new RenderedService({
				service_name : services.service_name,
				instance_number : services.instance_number,
				state_running : services.running,
				state_pending : services.pending,
				state_stopped : services.stopped,
				state_terminated : services.terminated
			});

			models.push(model);
		});

		this.rendered.reset(models);

	},

	removeAll : function() {
		if (this.views.length) {
			_.each(this.views, function(item) {
				item.remove();
			});

			this.views.length = 0;
		}

		if (this.service_names.length) {
			this.service_names.length = 0;
		}

		if (this.services.length) {
			this.services.length = 0;
		}
	}
});

