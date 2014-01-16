window.Dashboard = Backbone.Model.extend({
});

window.DashboardView = Backbone.View.extend({
	template : _.template($('#tmpl_dashboard_item').html()),

	render : function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = tmpl;
		return this;
	}
});

window.Resource = Backbone.Model.extend({

});

window.Resources = Backbone.Collection.extend({
	model : Resource
});


window.ResourceItem = Backbone.View.extend({
	template : _.template($('#tmpl_resource_item').html()),

	initialize : function() {

	}, 

	render : function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = tmpl;
		return this;
	}
});

window.ResourceList = Backbone.View.extend({
	el : '#target',
	
	events:  {
		'click .range' : 'clicked',
	},	
	
	clicked : function(e) {
		var metric = $(e.target).closest('ul').attr('metric');
		var location = window.location.href;
		var instance = location.split('/').pop(); 
	
		console.log(instance);
		console.log(metric); 
	},

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
		this.dashViews = [];
		this.dashboard = new Dashboard();
	},
	
	addDashboard : function() {
		var view = new DashboardView({
			model: this.dashboard,
		});
		
		this.$el.append(view.render().el);
		this.dashViews.push(view);
	},

	addOne : function(item) {
        var view = new ResourceItem({
                model : item,
        });
        
		this.$el.append(view.render().el);
		
        
        var chartDatas = new ChartDatas();
		var defaultTime = '1'; // last 1 hour
		chartDatas.url = '/resources/' + view.model.get('metric') + '/' + view.model.get('instance') + '/' + defaultTime;
        
        view.chartView = new ChartView({
        	collection: chartDatas
        });
        
        view.chartView.color = item.get('color');
        view.chartView.target = 'chart_' + item.get('metric');
        view.chartView.render();

		this.views.push(view);
	},

	addAll : function() {
		this.addDashboard();
		this.collection.each(this.addOne, this);
	},

	render : function(instance_id) {
		
		this.removeAll();
		this.collection.reset([{
			title : 'CPU Utilization',
			metric : 'cpu_utilization',
			color : 'orangered',
			instance : instance_id,
		}, {
			title : 'Network In',
			metric : 'network_in',
			color : 'darkgreen',
			instance : instance_id,
		}, {
			title : 'Disk Read Bytes',
			metric : 'disk_read_bytes',
			color : 'dodgerblue',
			instance : instance_id,
		}, {
			title : 'Disk Read Ops',
			metric : 'disk_read_ops',
			color : 'purple',
			instance : instance_id,
		}, {
			title : 'Network Out',
			metric : 'network_out',
			color : 'olive',
			instance : instance_id,
		}, {
			title : 'Disk Write Bytes',
			metric : 'disk_write_bytes',
			color : 'teal',
			instance : instance_id,
		}, {
			title : 'Disk Write Ops',
			metric : 'disk_write_ops',
			color : 'mediumpurple',
			instance : instance_id,
		}, ]);
	},

	removeAll : function() {
		if (this.views.length) {
			_.each(this.views, function(item) {
				item.remove();
				if (item.chartView) {
					item.chartView.removeAll();				}
			});

			this.views.length = 0;
		}
		
		if (this.dashViews.length) {
			_.each(this.views, function(item) {
				item.remove();
			});

			this.dashViews.length = 0;
		}
	},
	


});
