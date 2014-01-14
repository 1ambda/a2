window.BowView = Backbone.View.extend({
	el: '#bow',
	template: _.template($('#tmpl_bow').html()),
	
	render: function() {
		this.removeAll();
		var tmpl = this.template();
		this.$el.append(tmpl);
	},
	
	removeAll: function() {
		this.$el.html('');
	}
	
});
