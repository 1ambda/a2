window.ChartData = Backbone.Model.extend({

});

window.ChartDatas = Backbone.Collection.extend({
	model : ChartData,
});

window.ChartView = Backbone.View.extend({
	initialize : function() {
		this.listenTo(this.collection, 'reset', this.drawChart);
		this.chart = createChart();
	},

	render : function(metric, instance, time) {
		this.metric = metric;
		this.collection.url = '/resources/' + metric + '/' + instance + '/' + time;
		this.collection.fetch({
			reset : true
		});
		
	},

	drawChart : function() {
		if ( _.size(this.collection) === 0 ) {
			return;
		}
		
		if (this.metric == "cpu_utilization") {
			this.chart.graphs[0].valueField = "average";
		} else {
			this.chart.graphs[0].valueField = "sum";
		}
		
		this.chart.graphs[0].lineColor = ColorMap[this.color];
		this.chart.chartCursor.categoryBalloonColor = ColorMap[this.color];
		this.chart.dataProvider = this.collection.toJSON();
		this.chart.write(this.target);
		this.chart.numberFormatter = {
			precision : this.precise,
			decimalSeparator : '.',
			thousandsSeparator : ','
		};
		this.chart.validateData();
		// this.chart.validateNow();
	},

	removeAll : function() {
		this.chart.clear();
		this.collection.url = '';
		this.collection.reset();
		this.collection = null;
		this.remove();
	}
});

window.createChart = function() {

	var chart;
	var graph;

	// SERIAL CHART
	chart = new AmCharts.AmSerialChart();
	chart.pathToImages = "javascripts/amcharts/images/";
	chart.dataProvider = null;
	chart.marginLeft = 10;
	chart.categoryField = "time_stamp";

	// chart.dataDateFormat = "YY-MM";

	// listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
	chart.addListener("dataUpdated", zoomChart);

	// AXES
	// category
	var categoryAxis = chart.categoryAxis;
	categoryAxis.parseDates = true;
	// as our data is date-based, we set parseDates to true
	categoryAxis.minPeriod = "mm";
	categoryAxis.dateFormats = [{
		period : 'fff',
		format : 'JJ:NN:SS'
	}, {
		period : 'ss',
		format : 'JJ:NN:SS'
	}, {
		period : 'mm',
		format : 'JJ:NN'
	}, {
		period : 'hh',
		format : 'JJ:NN'
	}, {
		period : 'DD',
		format : 'MMM DD'
	}, {
		period : 'WW',
		format : 'MMM DD'
	}, {
		period : 'MM',
		format : 'MMM YYYY'
	}, {
		period : 'YYYY',
		format : 'MMM YYYY'
	}];
	// our data is yearly, so we set minPeriod to YYYY
	categoryAxis.dashLength = 3;
	categoryAxis.minorGridEnabled = true;
	categoryAxis.minorGridAlpha = 0.1;

	// value
	var valueAxis = new AmCharts.ValueAxis();
	valueAxis.axisAlpha = 0;
	valueAxis.inside = true;
	valueAxis.dashLength = 3;
	valueAxis.minimum = 0;
	chart.addValueAxis(valueAxis);

	// GRAPH
	graph = new AmCharts.AmGraph();
	// graph.type = "line";
	graph.type = "smoothedLine";
	// this line makes the graph smoothed line.
	graph.negativeLineColor = "#637bb6";
	// this line makes the graph to change color when it drops below 0
	graph.bullet = "none";
	graph.bulletSize = 8;
	graph.bulletBorderColor = "#FFFFFF";
	graph.bulletBorderAlpha = 1;
	graph.bulletBorderThickness = 2;
	graph.lineThickness = 2;
	graph.valueField = "average";
	// graph.balloonText = "[[category]]<br><br><b><span style='font-size:14px;'>[[value]]</span></b>";
	graph.balloonText = "<b><span style='font-size:14px;'>[[value]]</span></b>";
	// graph.balloonColor = "#637bb6";
	chart.addGraph(graph);

	// CURSOR
	var chartCursor = new AmCharts.ChartCursor();
	chartCursor.cursorAlpha = 0;
	chartCursor.cursorPosition = "mouse";
	chartCursor.categoryBalloonDateFormat = "MM-D JJ:NN";
	// chartCursor.categoryBalloonDateFormat = "Percent";
	chart.addChartCursor(chartCursor);

	// SCROLLBAR
	var chartScrollbar = new AmCharts.ChartScrollbar();
	chart.addChartScrollbar(chartScrollbar);

	chart.creditsPosition = "bottom-right";

	return chart;

	// this method is called when chart is first inited as we listen for "dataUpdated" event
	function zoomChart() {
		// different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
		// chart.zoomToDates();
	};

};

