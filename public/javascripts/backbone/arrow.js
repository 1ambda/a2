window.ArrowView = Backbone.View.extend({
	el : '#arrow',
	template : _.template($('#tmpl_arrow').html()),

	render : function() {
		this.removeAll();
		var tmpl = this.template();
		this.$el.html(tmpl);
	},
	
	removeAll: function() {
		this.$el.html('');
	}
});
