/*
Food Publications
*/
Meteor.publish('allFood', function() {
	return Food.find({});
});

Meteor.publish('orderFood', function(orderId) {
	return Food.find({orderId:orderId});
});

/*
Order Publications
*/

Meteor.publish('allOrders', function() {
	return Orders.find({});
});

Meteor.publish('userOrders', function() {
	return Orders.find({userid:this.userId});
});

Meteor.publish('singleOrder', function(orderId) {
	return Orders.find(orderId);
});
