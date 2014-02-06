Template.foodOrderItem.events({
	'click .foodOrderItems': function() {
		Session.set("addingNewFoodItem", false);
		Session.set("selectedFoodOrderItem", this._id);
	}
});

Template.foodOrderItem.selectedFoodOrderItem = function() {
	return Session.get("selectedFoodOrderItem") === this._id;
};
