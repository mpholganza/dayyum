Template.orderBilling.events({
	'submit form': function(e) {
		e.preventDefault();
		var $form = $('#payment-form');

		// Disable the submit button to prevent repeated clicks
		$form.find('button').prop('disabled', true);

		Stripe.setPublishableKey('pk_test_AYtaRhoGqICMZMmo3MB2gsh2');
		
		var that = this;
		Stripe.card.createToken($form, function(status, response) {
			//var $form = $('#payment-form');
			if (response.error) {
				// Show the errors on the form
				Errors.clearSeen();
				Errors.throw(response.error.message);
				$form.find('button').prop('disabled', false);
			} else {
				// token contains id, last4, and card type
				var token = response.id;

				Meteor.call('saveStripeToken', token, function(error, response) {
					if (error) {
						Errors.throw(error.message);
						$form.find('button').prop('disabled', false);
						return;
					}

					// TODO: FIX this: 'this' is null in this context
					Router.go('orderConfirmation', {_id: that._id});
				});
			}
		});

		return false;
	}
});
