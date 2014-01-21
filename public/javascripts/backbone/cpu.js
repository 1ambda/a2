window.CpuChartModel = Backbone.Model.extend({
});

window.CpuChartCollection = Backbone.Collection.extend({
	model : CpuChartModel
});

window.CpuChartView = Backbone.View.extend({
	el : '#cpu-chart',

	initialize : function() {
		this.listenTo(this.collection, 'reset', this.draw);
		this.color = 'purple';
		this.target = 'chart-target';
		
		this.chart = createChart();
		this.chart.graphs[0].lineColor = ColorMap[this.color];
		this.chart.chartCursor.categoryBalloonColor = ColorMap[this.color];
		this.chart.numberFormatter = {
			precision : this.precise,
			decimalSeparator : '.',
			thousandsSeparator : ','
		};
	},

	draw : function() {
		this.chart.dataProvider = this.collection.toJSON();
		this.chart.write(this.target);
		this.chart.validateData();
	},

	render : function(instance_id) {
		var defaultTime = 'Last3Hours';
		this.collection.url = '/resources/cpu_utilization/' + instance_id + '/' + defaultTime;
		this.collection.fetch({
			reset : true
		});
	}
});

window.CpuStatModel = Backbone.Model.extend({

});

window.CpuStatView = Backbone.View.extend({
	el : '#cpu-stat',

	render : function() {

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
		this.statModel = new CpuStatModel();
		this.statView = new CpuStatView();

		this.views = [];
		this.views.push(this.chartView);
		this.views.push(this.statView);
	},

	render : function(instance_id) {
		var tmpl = this.template();
		this.$el.html(tmpl);

		this.chartView.render(instance_id);
	},

	removeAll : function() {
		if (this.views.length) {
			_.each(this.views, function(item) {
				// item.removeAll();
			});
		}
	}
});
