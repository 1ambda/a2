window.CpuChartModel = Backbone.Model.extend({
});

window.CpuChartCollection = Backbone.Collection.extend({
	model : CpuChartModel
});

window.CpuChartView = Backbone.View.extend({
	events : {
		'click .cpu_range' : 'clicked'
	},

	clicked : function(e) {
		var dom = e.target;
		// var metric = $(dom).closest('ul').attr('metric');
		var instance = this.instance_id;
		var time = $(dom).html().replace(/\s/g, "");
		var string = $(dom).text();
		var button = $('#btn_range', this.el);
		$(button).text(string);

		this.chartDraw(instance, time);
	},

	chartDraw : function(instance_id, time) {
		this.collection.url = '/resources/cpu_utilization/' + instance_id + '/' + (time || this.defaultTime);
		this.collection.fetch({
			reset : true
		});
	},

	template : _.template($('#tmpl_resource_metric_chart').html()),

	initialize : function() {
		this.listenTo(this.collection, 'reset', this.draw);
		this.color = 'purple';
		this.target = 'chart-target_cpu_utilization';
		this.precise = 2;
		this.defaultTime = 'Last3Hours';

	},

	draw : function() {
		this.chart.dataProvider = this.collection.toJSON();
		this.chart.write(this.target);
		this.chart.validateData();
	},

	render : function(instance_id, time) {
		this.el = '#cpu-chart';
		this.$el = $(this.el);
		this.instance_id = instance_id;

		var tmpl = this.template({ title: 'CPU Utilization', metric: 'cpu_utilization' });
		this.$el.html(tmpl);
		this.delegateEvents();
		// for range button

		this.chart = createChart();
		this.chart.graphs[0].lineColor = ColorMap[this.color];
		this.chart.chartCursor.categoryBalloonColor = ColorMap[this.color];
		this.chart.numberFormatter = {
			precision : this.precise,
			decimalSeparator : '.',
			thousandsSeparator : ','
		};
		this.chartDraw(instance_id, time);
	},

	removeAll : function() {
		this.chart.clear();
	}
});

window.CpuStatModel = Backbone.Model.extend({
	// url: function() {
		// return '/instance/' + this.get('instance_id') + '/max_resources/'; 	
	// }
});

window.CpuStatCollection = Backbone.Collection.extend({
	model: CpuStatModel
	// url: function() {
		// return '/instance/' + this.get('instance_id') + '/max_resources/'; 	
	// }
});

window.CpuStatView = Backbone.View.extend({
	template : _.template($('#tmpl_resource_cpu_stat').html()),

	initialize : function() {
		this.listenTo(this.collection, 'reset', this.draw);
	},

	render : function(instance_id) {
		this.el = '#cpu-stat';
		this.$el = $(this.el);

		this.collection.url = '/instance/' + instance_id + '/max_resources/'; 	
		this.collection.fetch({reset : true});
	},

	draw : function() {
		
		var tmpl = this.template(this.collection.at(0).toJSON());
		this.$el.html(tmpl);
		this.metric = 'cpu';
	},

	removeAll : function() {

	}
});

window.CpuView = Backbone.View.extend({
	el : '#target',

	template : _.template($('#tmpl_resource_cpu').html()),

	initialize : function() {
		this.chartCollection = new CpuChartCollection();
		this.chartView = new CpuChartView({
			collection : this.chartCollection
		});
		// this.statModel = new CpuStatModel();
		this.statCollection = new CpuStatCollection();
		this.statView = new CpuStatView({
			collection : this.statCollection
		});

		this.views = [];
		this.views.push(this.chartView);
		this.views.push(this.statView);
	},

	render : function(instance_id) {
		var tmpl = this.template();
		this.$el.html(tmpl);
		this.instance_id = instance_id;

		this.chartView.render(this.instance_id);
		// this.statView.render(this.instance_id);
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
