$(document).ready(function() {
	LoginView = Backbone.View.extend({
		el : $('#modal_login'),

		initialize : function() {
			this.akid = this.$('#input_akid');
			this.sak = this.$('#input_sak');
			this.error = this.$('.error').hide();
		},

		events : {
			'click a[id=input_login]' : 'doLogin'
		},

		doLogin : function(event) {
			if ((this.akid.val()) && (this.sak.val())) {
				$.ajax({
					url: 'login',
					type: 'post',
					data: { akid: this.akid.val(), sak: this.sak.val() },
					success: function(data) {
						console.log(data);
						if ( data.result ) {
							console.log(data);
							console.log(data.result);
							console.log(data.message);
							alert("Code : " + data.result + "\nMessage : " + data.message);
						} else {
							window.location.href = "/";
						}
					}	
				});
				
				this.$el.foundation('reveal', 'close');
			} else {
				this.error.show();
			}
		}
	});

	var loginView = new LoginView();
});

