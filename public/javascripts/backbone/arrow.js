window.ArrowView = Backbone.View.extend({
	el : '#arrow',
	template : _.template($('#tmpl_instance_arrow').html()),
	events : {
		'click a[class=arrow_attr]' : 'arrowAttrClicked',
		'click a[class=arrow_attr_region]' : 'arrowAttrRegionClicked',
		'click a[class=arrow_attr_type]' : 'arrowAttrTypeClicked',
	},
	
	arrowResourceCpu: function(e) {
		console.log(1);	
	},

	arrowAttrClicked : function(e) {
		var dom = e.target;
		var bow = '#bow input';

		var previous = $(bow).val();

		if ($(dom).text() == 'service text') {
			$(bow).val(previous + ' ' + 'service=');
		} else {
			$(bow).val(previous + ' ' + $(dom).text() + '=');
		}
	},

	arrowAttrRegionClicked : function(e) {
		var dom = e.target;
		var bow = '#bow input';

		var previous = $(bow).val();
		$(bow).val(previous + ' region=' + $(dom).text());
	},

	arrowAttrTypeClicked : function(e) {
		var dom = e.target;
		var bow = '#bow input';

		var previous = $(bow).val();
		$(bow).val(previous + ' instance-type=');
	},

	render : function(type, instance_id) {
		this.removeAll();

		switch(type) {
			case 'resource' :
				this.resourceArrow(instance_id);
				break;
			case 'instance' :
				this.instanceArrow();
				break;
			case 'service' :
				this.serviceArrow();
				break;
		}

		$(window).trigger('resize');
	},

	resourceArrow : function(instance_id) {
		this.template = _.template($('#tmpl_resource_arrow').html());
		var tmpl = this.template({instance_id : instance_id});
		this.$el.html(tmpl);
		var parentHeight = $('dd.empty').parent().height();

		function funLoad() {

			var contentHeight = $('#content').height();
			var windowHeight = $(window).height();

			var Cheight = null;

			if (contentHeight > windowHeight) {
				Cheight = $('body').prop('scrollHeight');
			} else {
				Cheight = $('body').height();
			}

			Cheight -= $('dd.empty').offset().top;
			$('dd.empty').css({
				'height' : Cheight + 'px'
			});
		}

		window.onload = funLoad;
		window.onresize = funLoad;
	},

	instanceArrow : function() {
		this.template = _.template($('#tmpl_instance_arrow').html());
		var tmpl = this.template();
		this.$el.html(tmpl);

		var parentHeight = $('.empty').parent().height();

		var funLoad = function() {

			var contentHeight = $('#content').height();
			var windowHeight = $(window).height();

			var Cheight = null;

			if (contentHeight > windowHeight) {
				Cheight = $('body').prop('scrollHeight');
			} else {
				Cheight = $('body').height();
			}

			Cheight -= $('.empty').offset().top;

			$('.empty').css({
				'height' : Cheight + 'px'
			});
		}();

		window.onload = funLoad;
		window.onresize = funLoad;
	},

	serviceArrow : function() {
		this.template = _.template($('#tmpl_service_arrow').html());
		var tmpl = this.template();
		this.$el.html(tmpl);

		var parentHeight = $('.empty').parent().height();

		var funLoad = function() {

			var contentHeight = $('#content').height();
			var windowHeight = $(window).height();

			var Cheight = null;

			if (contentHeight > windowHeight) {
				Cheight = $('body').prop('scrollHeight');
			} else {
				Cheight = $('body').height();
			}

			Cheight -= $('.empty').offset().top;

			$('.empty').css({
				'height' : Cheight + 'px'
			});
		}();

		window.onload = funLoad;
		window.onresize = funLoad;
	},

	removeAll : function() {
		this.$el.html('');
		window.onload = null;
		window.onresize = null;
	}
});
