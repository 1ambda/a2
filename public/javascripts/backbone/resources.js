window.Resource = Backbone.Model.extend({

});

window.Resources = Backbone.Collection.extend({
	model : Resource
});

window.ResourceItem = Backbone.View.extend({
	template : _.template($('#tmpl_resource_item').html()),

	render : function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = tmpl;
		return this;
	}
});

window.DashboardItem = Backbone.View.extend({
	template : _.template($('#tmpl_dashboard_item').html()),

	render : function() {
		var tmpl = this.template(this.model.toJSON());
		this.el = tmpl;
		return this;
	}
});

window.ResourceList = Backbone.View.extend({
	el : '#target',

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
	},

	addOne : function(item) {
		var view = null;
		if (/^dash/i.test(item.get('resource_name'))) {
			view = new DashboardItem({
				model : item
			});
		} else {
			view = new ResourceItem({
				model : item
			});
		}

		this.views.push(view);
		this.$el.append(view.render().el);
		if (!/^dash/i.test(item.get('resource_name'))) {
			createResourceChart(null, 'chart_' + item.get('chart_name'), item.get('color'));
		}
	},

	addAll : function() {
		this.collection.each(this.addOne, this);
	},

	render : function() {
	},
});
