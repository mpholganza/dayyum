Template.orderItem.events({
	'click .charge-button': function(e) {
		$(e.target).prop('disabled', true);
		Meteor.call('chargeCard', this._id, function(error, response) {
			if (error) {
				Errors.throw(error.message);
				return;
			}
		});
	}
});

Template.orderItem.helpers({
	submittedFormatted: function() {
		var submitted = new Date(this.submitted);
		return submitted.toString();
	},
});
