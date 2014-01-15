window.Resource = Backbone.Model.extend({

});

window.Resources = Backbone.Collection.extend({
	model : Resource
});

window.ResourceItem = Backbone.View.extend({
	template : _.template($('#tmpl_resource_item').html()),

	intialize : function() {
		this.chart = null;
	},

	render : function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = tmpl;
		return this;
	}
});

window.DashboardItem = Backbone.View.extend({
	template : _.template($('#tmpl_dashboard_item').html()),

	render : function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = tmpl;
		return this;
	}
});

window.ResourceList = Backbone.View.extend({
	el : '#target',

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
		this.dummyData = createDummyResources();
	},

	addOne : function(item) {
		var view = null;
		if (/^dash/i.test(item.get('resource_name'))) {
			view = new DashboardItem({
				model : item
			});
		} else {
			view = new ResourceItem({
				model : item
			});
		}

		this.views.push(view);
		this.$el.append(view.render().el);
		if (!/^dash/i.test(item.get('resource_name'))) {
			view.chart = createResourceChart(this.dummyData, item.get('color'));
			view.chart.write('chart_' + item.get('chart_name'));
		}
	},

	addAll : function() {
		this.collection.each(this.addOne, this);
	},

	render : function() {
		this.removeAll();
		// this.collection.fetch();
		this.collection.reset([{
			resource_name : 'Dashboard1',
			chart_name : 'dash1'
		}, {
			resource_name : 'Dashboard2',
			chart_name : 'dash2'
		}, 
		{
			resource_name : 'CPU Utilization',
			chart_name : 'cpu_utilization',
			color : 'orangered'
		}, {
			resource_name : 'Network In',
			chart_name : 'network_in',
			color : 'darkgreen'

		}, {
			resource_name : 'Disk Read Bytes',
			chart_name : 'disk_read_bytes',
			color : 'dodgerblue'
		}, {
			resource_name : 'Disk Read Ops',
			chart_name : 'disk_read_ops',
			color : 'purple'
		}, {
			resource_name : 'Network Out',
			chart_name : 'network_out',
			color : 'olive'

		}, {
			resource_name : 'Disk Write Bytes',
			chart_name : 'disk_write_bytes',
			color : 'teal'
		}, {
			resource_name : 'Disk Write Ops',
			chart_name : 'disk_write_ops',
			color : 'mediumpurple'
		}, ]);
	},

	removeAll : function() {
		if (this.views.length) {
			_.each(this.views, function(item) {
				item.remove();
			});

			this.views.length = 0;
		}
	}
});
