// Temporary meteor collection containing list of requested food
TempFood = new Meteor.Collection(null);
Session.set("addingNewFoodItem", true);

// Reset tempFood collection
resetTempFood = function() {
	TempFood.remove({});
	Session.set("addingNewFoodItem", true);
	Session.set("selectedFoodOrderItem", undefined);
};

Template.orderSubmit.tempFood = function() {
	return TempFood.find({});
};

Template.orderSubmit.showNewFoodItemForm = function() {
	return (Session.get("addingNewFoodItem"));
};

Template.orderSubmit.events({
	'click .addDish': function() {
		var food = {
			name: $('#newDishName').val(),
			recipe: $('#newRecipe').val()
		};
		
		if (food.name.length < 1) {
			alert('Please enter a dish name.');
			return;
		}
		
		// reset add dish form
		$('#newDishName').val('');
		$('#newRecipe').val('');

		TempFood.insert(food);
		Session.set("addingNewFoodItem", false);
		
		// TODO: Move focus to addAnotherDish button for easy keyboard input
		// $('#addAnotherDish').focus();
	},
	'click .addAnotherDish': function() {
		Session.set("addingNewFoodItem", true);
		Session.set("selectedFoodOrderItem", undefined);
	},
	'submit form': function(e) {
		e.preventDefault();

		var food = TempFood.find({}).fetch();
		var order = {
			dishes: food,
			restrictions: $(e.target).find('[name=restrictions]').val(),
			time: new Date().getTime()
		};
		
		Meteor.call('submitOrder', order, function(error, orderId) {
			alert(error);
			alert(orderId);
			if (error) {
				// TODO: error handling
				return;
			}

			Router.go('orderConfirmation', {_id: orderId});
		});
	}
});

