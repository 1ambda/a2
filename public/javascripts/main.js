$(document).ready(function() {

	
	window.Instance = Backbone.Model.extend({
		
	});
	
	window.Instances = Backbone.collection.extend({
		model: Instance
	});
	
	window.InstanceItem = Backbone.View.extend({
		tagName: 'tr',
		template: _.template($('#tmpl_instance_item').html()),
		
		events: {
			'click' : 'itemClick'	
		},
		
		render: function() {
			var tmpl = this.template(this.model.toJSON());
			$(this.el).html(tmpl);
			
			return this;
		},
		
		itemClick: function() {
			alert('clicked');
		}
	});
	
	window.InstanceList = Backbone.View.extend({
		el: $('#target'),
		template: _template($('#tmpl_instance_list').html()),
		
		initialize: function() {
			this.collection.bind('add', this.addOne, this);
			this.collection.bind('reset', this.addAll, this);
		},
		
		render: function() {
			var tmpl = this.template();
			$(this.el).html(tmpl);
			return this;
		},
		
		addOne: function(item) {
			var view = new InstanceItem({model: item});
			this.$('#target tbody').append(view.render().el);
		}, 
		
		addAll: function() {
			this.collection.each(this.addOne);
		}
	});
	
	window.AppView = Backbone.View.extend({
		initialize: function() {
			// Todo
			
		}
	});


	var A2Router = Backbone.Router.extend({
		routes : {
			'logout' : 'logout'
		},

		logout : function() {
			$.ajax({
				type : 'get',
				url : 'logout',
				success : function() {
					window.location.href = "/";
				}
			});
		}
	});

	var appRouter = new A2Router();

	Backbone.history.start();
});
