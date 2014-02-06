Template.foodOrderForm.events({
	'blur [name="dishName"]': function(e) {
		var dishName = $(e.target).val();
		
		if (dishName.length < 1) {
			alert("Please specify a dish name.");
			return;
		}
		
		TempFood.update(this._id, {$set:{name:dishName}})
	},
	'blur [name="recipe"]': function(e) {
		var recipe = $(e.target).val();
		TempFood.update(this._id, {$set:{recipe:recipe}})	
	}
});
