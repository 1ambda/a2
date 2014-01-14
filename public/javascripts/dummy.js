function createDummyInstances() {
	return [{
		service_name : "T Cloud",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "T Store",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "T Map",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}, {
		service_name : "One ID",
		instance_id : "al2041alf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "61.132.14.51",
		security_group : "default"
	}, {
		service_name : "One ID",
		instance_id : "da24lf-foql912",
		instance_type : "m1",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "54.130.214.51",
		security_group : "default"
	}, {
		service_name : "PCS",
		instance_id : "af01lf-foql912",
		instance_type : "t1.micro",
		instance_state : "Running",
		region : "Tokyo",
		public_ip : "58.102.14.51",
		security_group : "default"
	}];
};

function createDummyServices() {
	return [{
		service_name : "One ID",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "Hoppin",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "T Cloud",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}, {
		service_name : "OCB",
		instance_number : 5,
		state_running : 3,
		state_pending : 1,
		state_stopped : 1,
		state_terminated : 0
	}];
};

function createDummyResources() {
	var chartData = [{
		"year" : "1950",
		"value" : -0.307
	}, {
		"year" : "1951",
		"value" : -0.168
	}, {
		"year" : "1952",
		"value" : -0.073
	}, {
		"year" : "1953",
		"value" : -0.027
	}, {
		"year" : "1954",
		"value" : -0.251
	}, {
		"year" : "1955",
		"value" : -0.281
	}, {
		"year" : "1956",
		"value" : -0.348
	}, {
		"year" : "1957",
		"value" : -0.074
	}, {
		"year" : "1958",
		"value" : -0.011
	}, {
		"year" : "1959",
		"value" : -0.074
	}, {
		"year" : "1960",
		"value" : -0.124
	}, {
		"year" : "1961",
		"value" : -0.024
	}, {
		"year" : "1962",
		"value" : -0.022
	}, {
		"year" : "1963",
		"value" : 0
	}, {
		"year" : "1964",
		"value" : -0.296
	}, {
		"year" : "1965",
		"value" : -0.217
	}, {
		"year" : "1966",
		"value" : -0.147
	}, {
		"year" : "1967",
		"value" : -0.15
	}, {
		"year" : "1968",
		"value" : -0.16
	}, {
		"year" : "1969",
		"value" : -0.011
	}, {
		"year" : "1970",
		"value" : -0.068
	}, {
		"year" : "1971",
		"value" : -0.19
	}, {
		"year" : "1972",
		"value" : -0.056
	}, {
		"year" : "1973",
		"value" : 0.077
	}, {
		"year" : "1974",
		"value" : -0.213
	}, {
		"year" : "1975",
		"value" : -0.17
	}, {
		"year" : "1976",
		"value" : -0.254
	}, {
		"year" : "1977",
		"value" : 0.019
	}, {
		"year" : "1978",
		"value" : -0.063
	}, {
		"year" : "1979",
		"value" : 0.05
	}, {
		"year" : "1980",
		"value" : 0.077
	}, {
		"year" : "1981",
		"value" : 0.12
	}, {
		"year" : "1982",
		"value" : 0.011
	}, {
		"year" : "1983",
		"value" : 0.177
	}, {
		"year" : "1984",
		"value" : -0.021
	}, {
		"year" : "1985",
		"value" : -0.037
	}, {
		"year" : "1986",
		"value" : 0.03
	}, {
		"year" : "1987",
		"value" : 0.179
	}, {
		"year" : "1988",
		"value" : 0.18
	}, {
		"year" : "1989",
		"value" : 0.104
	}, {
		"year" : "1990",
		"value" : 0.255
	}, {
		"year" : "1991",
		"value" : 0.21
	}, {
		"year" : "1992",
		"value" : 0.065
	}, {
		"year" : "1993",
		"value" : 0.11
	}, {
		"year" : "1994",
		"value" : 0.172
	}, {
		"year" : "1995",
		"value" : 0.269
	}, {
		"year" : "1996",
		"value" : 0.141
	}, {
		"year" : "1997",
		"value" : 0.353
	}, {
		"year" : "1998",
		"value" : 0.548
	}, {
		"year" : "1999",
		"value" : 0.298
	}, {
		"year" : "2000",
		"value" : 0.267
	}, {
		"year" : "2001",
		"value" : 0.411
	}, {
		"year" : "2002",
		"value" : 0.462
	}, {
		"year" : "2003",
		"value" : 0.47
	}, {
		"year" : "2004",
		"value" : 0.445
	}, {
		"year" : "2005",
		"value" : 0.47
	}];

	return chartData;
};

function createDummyChart(chart, chart_name) {
	var graph;

	var chartData = createDummyResources();

	AmCharts.ready(function() {
		// SERIAL CHART
		chart = new AmCharts.AmSerialChart();
		chart.pathToImages = "javascripts/amcharts/images/";
		chart.dataProvider = chartData;
		chart.marginLeft = 10;
		chart.categoryField = "year";
		chart.dataDateFormat = "YYYY";

		// listen for "dataUpdated" event (fired when chart is inited) and call zoomChart method when it happens
		chart.addListener("dataUpdated", zoomChart);

		// AXES
		// category
		var categoryAxis = chart.categoryAxis;
		categoryAxis.parseDates = true;
		// as our data is date-based, we set parseDates to true
		categoryAxis.minPeriod = "YYYY";
		// our data is yearly, so we set minPeriod to YYYY
		categoryAxis.dashLength = 3;
		categoryAxis.minorGridEnabled = true;
		categoryAxis.minorGridAlpha = 0.1;

		// value
		var valueAxis = new AmCharts.ValueAxis();
		valueAxis.axisAlpha = 0;
		valueAxis.inside = true;
		valueAxis.dashLength = 3;
		chart.addValueAxis(valueAxis);

		// GRAPH
		graph = new AmCharts.AmGraph();
		graph.type = "smoothedLine";
		// this line makes the graph smoothed line.
		graph.lineColor = "#d1655d";
		graph.negativeLineColor = "#637bb6";
		// this line makes the graph to change color when it drops below 0
		graph.bullet = "round";
		graph.bulletSize = 8;
		graph.bulletBorderColor = "#FFFFFF";
		graph.bulletBorderAlpha = 1;
		graph.bulletBorderThickness = 2;
		graph.lineThickness = 2;
		graph.valueField = "value";
		graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>";
		chart.addGraph(graph);

		// CURSOR
		var chartCursor = new AmCharts.ChartCursor();
		chartCursor.cursorAlpha = 0;
		chartCursor.cursorPosition = "mouse";
		chartCursor.categoryBalloonDateFormat = "YYYY";
		chart.addChartCursor(chartCursor);

		// SCROLLBAR
		var chartScrollbar = new AmCharts.ChartScrollbar();
		chart.addChartScrollbar(chartScrollbar);

		chart.creditsPosition = "bottom-right";

		// WRITE
		chart.write(chart_name);
		chart.validateNow();
	});

	// this method is called when chart is first inited as we listen for "dataUpdated" event
	function zoomChart() {
		// different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
		chart.zoomToDates(new Date(1972, 0), new Date(1984, 0));
	};

};
