Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.map(function() {
	this.route('home', {
		path: '/'
	});
	this.route('orderSubmit', {
		path: '/order'
	});
	this.route('orderConfirmation', {
		path: '/confirmation/:_id',
		waitOn: function() {
			return [
				Meteor.subscribe('singleOrder', this.params._id),
				Meteor.subscribe('orderFood', this.params._id)
			];
		},
		data: function() { return Orders.findOne(this.params._id); }
	})
});

var requireLogin = function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    this.stop();
  }
}

Router.before(requireLogin, {only: 'orderConfirmation'});