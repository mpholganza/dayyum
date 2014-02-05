// Temporary meteor collection containing list of requested food
TempFood = new Meteor.Collection;

// Reset tempFood collection
resetTempFood = function() {
	TempFood.remove({});
};

resetTempFood();

Template.orderSubmit.tempFood = function() {
	return TempFood.find({});
};

Template.orderSubmit.events({
	'click .addDish': function(e) {
		var food = {
			name: $('#newDishName').val(),
			recipe: $('#newRecipe').val()
		};
		
		// reset add dish form
		$('#newDishName').val('');
		$('#newRecipe').val('');
		/*
		if(_.contains(_.values(food), null)) {
			alert('Please complete the dish name and recipe information.');
			return;
		}
		*/
		TempFood.insert(food);
	},
	'submit form': function(e) {
		e.preventDefault();
		var food = TempFood.find({}).fetch();
		var order = {
			food: food,
			restrictions: $(e.target).find('[name=restrictions]').val()
		}
		// validate food
		/*
		if (_.where(food, {name: '', recipe: ''}).length > 0) {
			alert('hi');
			throw new Meteor.Error(403, "One or more of the recipes has a missing name or recipe");
		}
		*/
		
		Router.go('orderConfirmation', order);
	}
});

