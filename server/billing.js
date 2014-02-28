Meteor.methods({
	saveStripeToken: function(stripeToken) {
		throw new Meteor.Error(401, "Not Implemented Yet.");
		
		// Set secret key
		/*
		stripe.setApiKey("sk_test_u1AsZeXmDBkFeJ3BzcFP1BSN");

		stripe.customers.create({
		  card: stripeToken,
		  description: 'payinguser@example.com'
		}).then(function(customer) {
		  return stripe.charges.create({
		    amount: 1000, // amount in cents, again
		    currency: "usd",
		    customer: customer.id
		  });
		}).then(function(charge) {
		  saveStripeCustomerId(user, customer.id);
		});
		*/
	},
	chargeCard: function(order) {
		throw new Meteor.Error(401, "Not Implemented Yet.");
		/*
		var customerId = getStripeCustomerId(user);

		stripe.charges.create({
		  amount: 1500, // amount in cents, again
		  currency: "usd",
		  customer: customer.id
		});
		*/
	}
});