window.ChartData = Backbone.Model.extend({

});

window.ChartDatas = Backbone.Collection.extend({
	model : ChartData,
});

var map = {
	darkgreen : '#006400',
	olive : '#808000',
	dodgerblue : '#4682B4',
	teal : '#008080',
	purple : '#800080',
	mediumpurple : '#9370DB',
	orangered : '#FF4500'
};

window.ChartView = Backbone.View.extend({
	initialize : function() {
		this.chart = createChart();
		this.listenTo(this.collection, 'reset', this.drawChart);
	},

	render : function(metric, instance, time) {
		this.collection.url = '/resources/' + metric + '/' + instance + '/' + time;
		this.collection.fetch({
			reset : true
		});
	},

	drawChart : function() {
		this.chart.graphs[0].lineColor = map[this.color];
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

function createChart() {

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

