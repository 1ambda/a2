window.CpuAvgModel = Backbone.Model.extend({
	
});

window.CpuAvgCollection = Backbone.Collection.extend({
	model: CpuAvgModel	
});

window.CpuAvgView = Backbone.Collection.extend({
	initialize: function() {
		this.listenTo(this.collection, 'reset', this.draw);
	},
	
	render: function() {
		var defaultTime = 3; // last 3 hours
		this.collection.url = '/instances/cpu/'	
	},
	
	draw: function() {
		
	}
});


window.Instance = Backbone.Model.extend({

});

window.Instances = Backbone.Collection.extend({
	model : Instance,
	url : '/instance'
});

window.InstanceItem = Backbone.View.extend({
	tagName : 'tr',
	template : _.template($('#tmpl_instance_item').html()),

	events : {
		'click' : 'itemClick'
	},

	render : function() {

		var launch_time = new Date(this.model.get('launch_time'));
		var now = new Date();

		var diff = now.getTime() - launch_time.getTime();
		var diffHours = (diff / 1000 / 60 / 60);

		if (diffHours >= 336) {
			// 2 weeks
			this.model.set({
				resolved : 'required' 
			});
		} else {
			this.model.set({
				resolved : '' 
			});
		}

		var tmpl = this.template(this.model.toJSON());
		$(this.el).html(tmpl);
		return this;
	},

	itemClick : function() {
		window.router.navigate('instance/' + this.model.get('instance_id'), {
			trigger : true
		});
	}
});

window.InstanceList = Backbone.View.extend({
	el : '#target',
	template : _.template($('#tmpl_instance_list').html()),

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
	},

	render : function() {
		var tmpl = this.template();
		this.$el.html(tmpl);
		this.collection.fetch({
			reset : true
		});
		
		var cpuAvgCollection = new CpuAvgCollection();
		var cpuAvgView = new CpuAvgView({
			collection: cpuAvgCollection
		});
		
		cpuAvgView.render();
		
		this.views.push(cpuAvgView);
	},

	addOne : function(item) {		var view = new InstanceItem({
			model : item,
		});

		this.views.push(view);
		this.$('tbody').append(view.render().el);
	},

	addAll : function() {
		this.collection.each(this.addOne, this);
		$('#target').foundation();
	},

	removeAll : function() {
		this.$el.html('');
		if (this.views.length) {
			_.each(this.views, function(item) {
				item.remove();
			});

			this.views.length = 0;
		}
	}
});
