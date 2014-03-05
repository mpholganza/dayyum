DebugInfo = 1;
var stripeResponseHandler = function(status, response) {
  var $form = $('#payment-form');
  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // token contains id, last4, and card type
    var token = response.id;
		
		Meteor.call('saveStripeToken', token, function(error, response) {
			if (error) {
		    $form.find('.payment-errors').text(error.message);
		    $form.find('button').prop('disabled', false);
				return;
			}

			// TODO: FIX this: 'this' is null in this context
			Router.go('orderConfirmation', {_id: this._id});
		});
  }
};

Template.orderBilling.events({
	'submit form': function(e) {
		e.preventDefault();
		var $form = $('#payment-form');

		// Disable the submit button to prevent repeated clicks
		$form.find('button').prop('disabled', true);

		Stripe.setPublishableKey('pk_test_AYtaRhoGqICMZMmo3MB2gsh2');
		Stripe.card.createToken($form, stripeResponseHandler);

		//Router.go('orderConfirmation', {_id: this._id});
		return false;
	}
});