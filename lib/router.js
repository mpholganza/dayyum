Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function() {
	this.route('home', {
		path: '/'
	});
	this.route('orderSubmit', {
		path: '/order'
	});
	this.route('orderConfirmation', {
		path: '/confirmation'
	})
});
