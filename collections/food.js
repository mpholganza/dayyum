Food = new Meteor.Collection('food');

Meteor.methods({
	submitFood: function(foodAttributes) {
		var user = Meteor.user();
		
		// ensure the user is logged in
		if (!user) {
			throw new Meteor.Error(401, "You need to login to post new stories");
		}
		
		// ensure the food has a name
		if (!foodAttributes.name) {
			throw new Meteor.Error(422, 'The food has no name');
		}
		
		var food = _.extend(_.pick(foodAttributes,
			'name', 'recipe', 'orderId'), {
				userId: user._id || 0,
				author: user.username || '',
				submitted: new Date().getTime()
		});
		
		var foodId = Food.insert(food);
		console.log('new food: ' + foodId);
		return foodId;
	}
});
