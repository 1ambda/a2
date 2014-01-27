window.CpuAvgModel = Backbone.Model.extend({

});

window.CpuAvgCollection = Backbone.Collection.extend({
	model : CpuAvgModel
});

window.CpuAvgView = Backbone.View.extend({
	initialize : function() {
		this.listenTo(this.collection, 'reset', this.draw);
	},

	render : function() {
		// to change default check time, see 'config.js' in javascripts folder
		this.collection.url = '/instances/cpu/' + window.cpuUpgradeCheckHours;
		this.collection.fetch({
			reset : true
		});
	},

	draw : function() {
		// logic for cpu upgrade column
		var result = this.collection.toJSON();
		var length = result.length;
		var index = 0;

		var tmpl = _.template($('#tmpl_instance_upgrade').html());
		
		if (length) {
			var flag = setInterval(function() {
				if (index < length) {
					var target = $('td.' + result[index]._id, '#target');
					var type = $(target).parent('tr').children('.type').text();
					
					var average = Number(result[index].avg).toFixed(2);

					var parsed = {
						cpu_check_string : window.cpuUpgradeCheckString,
						avg : average
					};
					
					if (window.instanceType[type]) {
						if (average >= window.cpuUpgradeCondition) {
							parsed['instance_type'] = window.instanceType[type].upgrade;
							parsed['comment'] = "up";
							$(target).html(tmpl(parsed));
						} else if (average < window.cpuDowngradeCondition) {
							parsed['instance_type'] = window.instanceType[type].downgrade;
							parsed['comment'] = "down";
							$(target).html(tmpl(parsed));
						} else {
							$('td.' + result[index]._id, '#target').html('');
						}
					}
					index++;
				} else {
					clearInterval(flag);
				}

			}, window.cpuCheckInterval);
		}
	}
});

window.Instance = Backbone.Model.extend({

});

window.Instances = Backbone.Collection.extend({
	model : Instance,
	url : '/instance'
});

window.InstanceItem = Backbone.View.extend({
	tagName : 'tr',
	template : _.template($('#tmpl_instance_item').html()),

	events : {
		'click' : 'itemClick'
	},

	render : function() {

		var launch_time = new Date(this.model.get('launch_time'));
		var now = new Date();

		var diff = now.getTime() - launch_time.getTime();
		var diffHours = (diff / 1000 / 60 / 60);

		if (diffHours >= window.reservedHours) {
			// 2 weeks
			this.model.set({
				resolved : 'required'
			});
		} else {
			this.model.set({
				resolved : ''
			});
		}

		var tmpl = this.template(this.model.toJSON());
		$(this.el).html(tmpl);
		return this;
	},

	itemClick : function() {
		window.router.navigate('instance/' + this.model.get('instance_id'), {
			trigger : true
		});
	}
});

window.InstanceList = Backbone.View.extend({
	el : '#target',
	template : _.template($('#tmpl_instance_list').html()),

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
		var view = new InstanceItem({			model : item,
		});

		this.views.push(view);
		this.$('tbody').append(view.render().el);
	},

	addAll : function() {
		this.collection.each(this.addOne, this);

		this.cpuAvgCollection = new CpuAvgCollection();		this.cpuAvgView = new CpuAvgView({
			collection : this.cpuAvgCollection
		});
		this.cpuAvgView.render();
		this.views.push(this.cpuAvgView);
		
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
