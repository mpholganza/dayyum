Accounts.config({
	sendVerificationEmail: true
});

// Validate email, sending a specific error message on failure.
Accounts.validateNewUser(function (user) {
	// Validate username/email here
  /*
	if (user.username && user.username.length >= 3)
    return true;
  throw new Meteor.Error(403, "Username must have at least 3 characters");
	*/
	return true;
});

Accounts.emailTemplates.siteName = "Dayyum";
Accounts.emailTemplates.from = "dayyum admin <admin@dayyum.com>";

Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to Dayyum!"; // + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "We look forward to cooking for you!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};

Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Welcome to Dayyum!"; // + user.profile.name;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
   return "We look forward to cooking for you!"
     + " To activate your account, simply click the link below:\n\n"
     + url;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Dayyum password reset"; // + user.profile.name;
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
   return "You've specified that you've forgotten your Dayyum password."
     + " To activate your account, simply click the link below:\n\n"
     + url
		 + "\n\nIf you believe you've received this email by mistake,"
		 + " please ignore this email.";
};
