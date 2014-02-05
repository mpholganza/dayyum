Template.orderConfirmation.tempFood = function() {
	return TempFood.find({});
};

Template.orderConfirmation.events({
	'click .confirmOrder': function() {
		resetTempFood();
	}
});