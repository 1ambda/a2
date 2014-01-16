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
		
		var dom = e.target;
		
		var metric = $(dom).closest('ul').attr('metric');
		var instance = window.location.href.split('/').pop();
		var time = $(dom).html().replace(/\s/g, "");
		
		var selectedView = _.find(this.views, function(item) {
			if (item.model.get('metric') == metric ) {
				return true;
			}	
			
			return false;
		});
		
		selectedView.chartView.render(metric, instance, time);
	},

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
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
        
        view.chartView = new ChartView({
        	collection: chartDatas
        });
        
        view.chartView.color = item.get('color');
        view.chartView.target = 'chart_' + item.get('metric');
        view.chartView.unit = item.get('unit');
        view.chartView.precise = item.get('precise');
        
		var metric = view.model.get('metric');
		var instance = view.model.get('instance');		
		var defaultTime = 'Last3Hours'; // last 1 hour
		
        view.chartView.render(metric, instance, defaultTime);

		this.views.push(view);
	},

	addAll : function() {
		this.addDashboard();
		this.collection.each(this.addOne, this);
	},

	render : function(instance_id) {
		this.views = [];
		this.dashViews = [];
		this.dashboard = new Dashboard();
		
		this.removeAll();
		this.collection.reset([{
			title : 'CPU Utilization',
			metric : 'cpu_utilization',
			color : 'orangered',
			instance : instance_id,
			unit: '(Percent)',
			precise: 2
		}, {
			title : 'Network In',
			metric : 'network_in',
			color : 'darkgreen',
			instance : instance_id,
			unit: '(Bytes)',
			precise: 0
		}, {
			title : 'Disk Read',
			metric : 'disk_read_bytes',
			color : 'dodgerblue',
			instance : instance_id,
			unit: '(Bytes)',
			precise: 0
		}, {
			title : 'Disk Read',
			metric : 'disk_read_ops',
			color : 'purple',
			instance : instance_id,
			unit: '(Ops)',
			precise: 0
		}, {
			title : 'Network Out',
			metric : 'network_out',
			color : 'olive',
			instance : instance_id,
			unit: '(Bytes)',
			precise: 0
		}, {
			title : 'Disk Write',
			metric : 'disk_write_bytes',
			color : 'teal',
			instance : instance_id,
			unit: '(Bytes)',
			precise: 0
		}, {
			title : 'Disk Write',
			metric : 'disk_write_ops',
			color : 'mediumpurple',
			instance : instance_id,
			unit: '(Ops)',
			precise: 0
		}, ]);
	},

	removeAll : function() {
		if (this.views.length) {
			_.each(this.views, function(item) {
				if (item.chartView) {
					item.chartView.removeAll();				}
				item.remove();
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
















