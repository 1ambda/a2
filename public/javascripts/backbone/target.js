window.Target = Backbone.View.extend({
	initialize: function() {
		this.currentTarget = null; 
	},
	
	render: function(target, url, instance_id) {
		if (this.currentTarget) {
			this.currentTarget.removeAll();
		}
		
		this.currentTarget = target;
		
		if (url) {
			this.currentTarget.collection.url = url;
		}
		
		this.currentTarget.render(instance_id || null);
		$(document).foundation();
		$(window).trigger('resize');
	}
});
