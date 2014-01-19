window.BowView = Backbone.View.extend({
	el: '#bow',
	template: _.template($('#tmpl_bow').html()),
	events: {
		'click .button': 'shoot'	
	},
	
	shoot: function(e) {
		var input = $('input', '#bow');
		console.log($(input).val());
		
	},
	
	render: function() {
		this.removeAll();
		var tmpl = this.template();
		this.$el.append(tmpl);
	},
	
	removeAll: function() {
		this.$el.html('');
	}
	
});
