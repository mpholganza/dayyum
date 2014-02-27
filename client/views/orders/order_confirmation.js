Template.orderConfirmation.tempFood = function() {
	return Food.find({});
};

Template.orderConfirmation.events({
	'click .confirmOrder': function() {
		resetTempFood();
	}
});

Template.orderConfirmation.helpers({
	timeFormatted: function() {
		var date = new Date(this.time);
		return date.toString();
	},
});
