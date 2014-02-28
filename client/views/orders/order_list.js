Template.orderList.helpers({
  orderList: function() {
    return Orders.find({});
  }
});
