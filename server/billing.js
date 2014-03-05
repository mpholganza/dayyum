var Stripe = StripeAPI('sk_test_u1AsZeXmDBkFeJ3BzcFP1BSN');

var stripeCreateCustomerAsync = function(userId, email, stripeToken) {
	var future = new Future;
	
	Stripe.customers.create({
	  card: stripeToken,
	  description: email
	}, function(err, customer) {
		if (err) {
			console.log('stripeCreateCustomerAsync:' + err.message);
			throw new Meteor.Error(402, "Error creating customer info.");
		}
		future['return'](customer);
	});
	
	return future.wait();
};

var stripeCreateChargeAsync = function(amount, currency, customerId) {
	var future = new Future;
	
	Stripe.charges.create({
	  amount: amount, // amount in cents, again
	  currency: currency,
	  customer: customerId
	}, function(err, charge) {
		if (err && err.type === 'StripeCardError' ) {
			// TODO: Handle card declined
			console.log('stripeCreateChargeAsync:' + err.message);
			throw new Meteor.Error(402, "User has no credit card associated with account. Cannot charge card.")
		}
		future['return'](charge);
	});
	
	return future.wait();
};

Meteor.methods({
	saveStripeToken: function(stripeToken) {
		var user = Meteor.user();
		if (!user) {
			throw new Meteor.Error(402, "User not logged in. User must be logged in to enter billing information.");
		}
		
		var primaryEmail = user.emails[0].address;

		/* TODO: use Meteor._wrapAsync when this is public to make this look nicer
		_wrapAsync implementation.
		doesn't work as it depends on prototype methods/properties
		
		var createCustomerSync = Meteor._wrapAsync(Stripe.customers.create);
		var customer = createCustomerSync({
		  card: stripeToken,
		  description: primaryEmail
		});

		Meteor.users.update(userId, {$set: { 'services.stripe': { id: customer.id }}});
		*/

		var customer = stripeCreateCustomerAsync(user._id, primaryEmail, stripeToken);

		Meteor.users.update(user._id, {$set: { 'services.stripe': { id: customer.id }}});
	},
	chargeCard: function(orderId) {
		var order = Orders.findOne(orderId);
		if (!order) {
			// TODO: Handle order does not exist.
			throw new Meteor.Error(402, "Order does not exist. Cannot charge.");
		}

		if (order.paid) {
			throw new Meteor.Error(402, "This order has already been paid. Will not recharge for this order.");
		}

		var user = Meteor.users.findOne(order.userId);
		if (!user) {
			// TODO: Handle user does not exist. This would imply data corruption.
			throw new Meteor.Error(402, "User does not exist. Cannot charge user.");
		}

		if (!user.services.stripe || !user.services.stripe.id) {
			// TODO: Handle no stripe customer set up
			throw new Meteor.Error(402, "User has no credit card associated with account. Cannot charge card.")
		}

		var charge = stripeCreateChargeAsync(order.amountInCents, 'usd', user.services.stripe.id);
		
		/*
		Stripe.charges.create({
		  amount: 1500, // amount in cents, again
		  currency: "usd",
		  customer: user.services.stripe.id
		}, function(error, charge) {
			if (error && error.type === 'StripeCardError' ) {
				// TODO: Handle card declined
				throw new Meteor.Error(402, "User has no credit card associated with account. Cannot charge card.")
			
				Orders.update(order._id, {$set: {paid: 1}});
			}
		});
		*/

		Orders.update(order._id, {$set: {paid: 1, stripeChargeId: charge.id}});
	}
});