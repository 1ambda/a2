window.Dashboard = Backbone.Model.extend({
	url: function() {
		return '/instance/' + this.get('instance_id') + '/max_resources/';
	}
});

window.DashboardView = Backbone.View.extend({
	el: '#dashboard',
	template : _.template($('#tmpl_dashboard_attr').html()),
	initialize: function() {
		this.listenTo(this.model, 'change', this.draw);
		var tmpl = _.template($('#tmpl_dashboard_item').html());
		$('#target').append(tmpl);
	},
	
	render : function() {
		this.model.fetch();
	},
	
	draw: function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = '#dashboard';
		$('#dashboard', '#target').html(tmpl);
		
			// topbar : {custom_back_text: false },
		$('.overview').foundation({
			orbit : {
				timer_speed : 5000,
				pause_on_hover : false, // Pauses on the current slide while hovering
				resume_on_mouseout : true,
			}
		});
		$(this.el).foundation();
		$(window).trigger('resize');
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
		
		var context = $(dom).closest('#chart_view');
		var button = $('#btn_range', context);
		var string = $(dom).text().split('Last ').pop();
		button.text(string);
		
		
		var selectedView = _.find(this.views, function(item) {
			if (item.model.get('metric') == metric ) {
				return true;
			}	
			
			return false;
		});
		
		selectedView.chartView.render(metric, instance, time);
		
		return true;
	},

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
		this.dashViews = [];
	},
	
	addDashboard : function(instance_id) {
		var dashboard = new Dashboard({instance_id : instance_id});
        var view = new DashboardView({
                model: dashboard,
        });
        
        view.render();
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
		var defaultTime = 'Last1Hour'; // last 1 hour
		
        view.chartView.render(metric, instance, defaultTime);

		this.views.push(view);
	},

	addAll : function() {
		this.collection.each(this.addOne, this);
	},

	render : function(instance_id) {
		// this.removeAll();
		this.addDashboard(instance_id);
		
		this.collection.reset([{
			title : 'CPU',
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
			color : 'darkslateblue',
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
		this.$el.html('');
		this.collection.reset();
		if(this.views.length) {
            _.each(this.views, function(item) {
                if (item.chartView) {
                        item.chartView.removeAll();
                }
                item.remove();
            });
		}

			this.views.length = 0;
		
		if (this.dashViews.length) {
			_.each(this.dashViews, function(item) {
				item.remove();
				item.unbind();
			});

			this.dashViews.length = 0;
		}
		
		this.off();
	}
});
















