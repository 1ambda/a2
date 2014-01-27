window.Alert = Backbone.Model.extend({

});

window.Alerts = Backbone.Collection.extend({
	model : Alert,
	url: '/alerts/'
});

window.AlertItem = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click td[class=alert-object]' : 'clicked'	
	},
	
	clicked: function(e) {
		var dom = e.target;
		
		console.log($(dom).text());
	},
	
	template: _.template($('#tmpl_alert_item').html()),
	
	render: function() {
		var tmpl = this.template(this.model.toJSON());
		$(this.el).html(tmpl);
		return this;
	}
	
});

window.AlertList = Backbone.View.extend({
	el : '#target',
	template : _.template($('#tmpl_alert_list').html()),

	initialize : function() {
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);
		this.views = [];
	},

	render : function() {
		var tmpl = this.template();
		this.$el.html(tmpl);
		this.collection.fetch({
			reset : true
		});
	},

	addOne : function(item) {
		var view = new AlertItem({
			model : item,
		});

		this.views.push(view);
		this.$('tbody').append(view.render().el);
	},

	addAll : function(item) {
		this.collection.each(this.addOne, this);
		$('#target').foundation();
	},

	removeAll : function() {
		this.$el.html('');
		if (this.views.length) {
			_.each(this.views, function(item) {
				item.remove();
			});

			this.views.length = 0;
		}
	}
});
