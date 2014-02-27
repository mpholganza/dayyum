Orders = new Meteor.Collection('orders');

/*
Order schema
{
userid: id,
dishes: [dish1, dish2, ... ],
restrictions: 'vegetarian with a peanut allergy',
time: <schema still TODO>
}

Permissions:
only the server can submit/edit orders
all changes will be done through Meteor methods
clients will not be able to directly manipulate this
*/

Meteor.methods({
	submitOrder: function(orderAttributes) {
		var user = Meteor.user();
		
		if (!user) {
			throw new Meteor.Error(401, "You must be logged in to place an order");
		}
		
		if (!orderAttributes.dishes) {
			throw new Meteor.Error(401, "There are no dishes in this order");
		}
		
		// TODO: validate time
		if (!orderAttributes.time) {
			throw new Meteor. Error(401, "There is no time specified for this order");
		}
		
		var order = _.extend(_.pick(orderAttributes,
			'time', 'restrictions'), {
				userid: user._id,
				submitted: new Date().getTime()
			}
		);
		
		var orderId = Orders.insert(order);

		_.each(orderAttributes.dishes, function(food) {
			_.extend(food, {orderId: orderId});
			var foodId = Meteor.call('submitFood', food);
		});
		
		return orderId;
	}
});