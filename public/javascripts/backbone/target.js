window.Target = Backbone.View.extend({
	initialize: function() {
		this.currentTarget = null; 
	},
	
	render: function(target, url, instance_id) {
		
		// for removing launch-time tooltip 
		$('.has-tip').trigger('mouseout');

		if (this.currentTarget) {
			this.currentTarget.removeAll();
		}
		
		this.currentTarget = target;
		
		if (url) {
			this.currentTarget.collection.url = url;
		}
		
		this.currentTarget.render(instance_id || null);
		$('#target').foundation();
		$(window).trigger('resize');
	}
});
