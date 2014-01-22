window.StorageReadView = Backbone.View.extend({
	el : '#target',

	template : _.template($('#tmpl_resource_metric').html()),

	initialize : function() {
		// collection1 bytes, collection2 ops
		this.chartCollection1 = new MetricChartCollection();
		this.chartCollection2 = new MetricChartCollection();
		
		var template = _.template($('#tmpl_resource_metric_chart').html()); 
		
		this.chartView1 = new MetricChartView({
			collection : this.chartCollection1,
		});
		this.chartView2 = new MetricChartView({
			collection : this.chartCollection2,
		});

		this.chartView1.color = 'purple';
		this.chartView2.color = 'teal';
		this.chartView1.el = '#metric-chart1';
		this.chartView2.el = '#metric-chart2';
		this.chartView1.metric = 'disk_read_bytes';
		this.chartView2.metric = 'disk_read_ops';
		this.chartView1.title = 'Disk Read Bytes';
		this.chartView2.title = 'Disk Read Ops';
		this.chartView1.template = template;
		this.chartView2.template = template;
		

		this.statCollection1 = new MetricStatCollection();
		this.statCollection2 = new MetricStatCollection();

		// view's el property won't be working
		// because MetricView's render function is
		// not called yet.
		this.statView1 = new MetricStatView({
			collection : this.statCollection1,
		});

		this.statView2 = new MetricStatView({
			collection : this.statCollection2,
		});

		this.statView1.el = '#metric-stat';
		this.statView2.el = '#metric-stat';
		this.statView1.metric = 'disk_read_bytes';
		this.statView2.metric = 'disk_read_ops';
		this.statView1.template = _.template($('#tmpl_resource_metric1_stat').html());
		this.statView2.template = _.template($('#tmpl_resource_metric2_stat').html());

		this.views = [];
		this.views.push(this.chartView1);
		this.views.push(this.chartView2);
		this.views.push(this.statView1);
		this.views.push(this.statView2);
	},

	render : function(instance_id) {
		var tmpl = this.template();
		this.$el.html(tmpl);
		this.instance_id = instance_id;

		// this.statView1.render(instance_id);
		// this.statView2.render(instance_id);
		this.chartView1.render(instance_id);
		this.chartView2.render(instance_id);

	},

	removeAll : function() {
		if (this.views.length) {
			_.each(this.views, function(item) {
				item.removeAll();
			});
		}

		this.$el.html('');
	}
});

