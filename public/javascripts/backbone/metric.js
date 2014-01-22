window.MetricChartModel = Backbone.Model.extend({

});

window.MetricChartCollection = Backbone.Collection.extend({
	model : MetricChartModel
});

window.MetricChartView = Backbone.View.extend({
	events : {
		'click .cpu_range' : 'clicked'
	},

	clicked : function(e) {
		var dom = e.target;
		var instance = this.instance_id;
		var time = $(dom).html().replace(/\s/g, "");
		var string = $(dom).text();
		var button = $('#btn_range', this.el);
		$(button).text(string);
		

		this.getChartData(instance, time);
	},
	
	initialize : function() {
		this.listenTo(this.collection, 'reset', this.drawChart);
		
		this.precise = 2;
		this.defaultTime = 'Last1Hour';
	},

	drawChart : function() {
		this.target = 'chart-target_' + this.metric;
		this.chart.dataProvider = this.collection.toJSON();
		this.chart.write(this.target);
		this.chart.validateData();
	},

	render : function(instance_id) {
		this.$el = $(this.el);
		var tmpl = this.template({ title: this.title , metric: this.metric });
		this.$el.html(tmpl);

		this.instance_id = instance_id;
		this.delegateEvents();
		// for range button Event
		
		this.makeChart();
		this.getChartData(instance_id);
	},
	
	getChartData: function (instance_id, time) {
		this.collection.url = '/resources/' + this.metric + '/' + instance_id + '/' + (time || this.defaultTime);
		this.collection.fetch({
			reset: true
		});
	},

	makeChart: function () {
		this.chart = createChart();
		this.chart.graphs[0].lineColor = ColorMap[this.color];
		this.chart.chartCursor.categoryBalloonColor = ColorMap[this.color];
		this.chart.numberFormatter = {
			precision : this.precise,
			decimalSeparator : '.',
			thousandsSeparator : ','
		};
	},
	

	removeAll : function() {

	}
});

window.MetricStatModel = Backbone.Model.extend({

});

window.MetricStatCollection = Backbone.Collection.extend({
	model: MetricStatModel	
});

window.MetricStatView = Backbone.View.extend({

	initialize : function() {
		this.listenTo(this.collection, 'reset', this.draw);
	},

	draw : function() {
		var result = this.collection.at(0).toJSON();
		var data = {};
		data.maximum = result[this.metric].maximum;
		data.minimum = result[this.metric].minimum;
		data.average = result[this.metric].average;
		data.time_stamp = result[this.metric].time_stamp;  
		
		var tmpl = this.template(data);
		this.$el.append(tmpl);
	},

	render : function(instance_id) {
		this.$el = $(this.el);

		this.collection.url = '/instance/' + instance_id + '/max_resources/';
		this.collection.fetch({reset: true});
	},

	removeAll : function() {
	}
});