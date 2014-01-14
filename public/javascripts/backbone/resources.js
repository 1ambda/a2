window.Resource = Backbone.Model.extend({
	
});

window.Resources = Backbone.Collection.extend({
	model: Resource
});

window.ResourceItem = Backbone.View.extend({
	
});

window.ResourceList = Backbone.View.extend({
	el: '#target',
	template: _.template($('#tmpl_resource_list').html()),
	
	render: function() {
		this.removeAll();
		var tmpl = this.template();
		this.$el.append(tmpl);	
	},
	
	removeAll: function() {
		this.$el.html('');	
	}
});
