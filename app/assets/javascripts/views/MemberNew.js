Trellino.Views.MemberNew = Backbone.View.extend({
	
	// Model is the board receiving a new member.
  // Collection is the user's boards.
	
	events: {
		"click input[type='submit']": "add",
		"click button.cancel": "cancel"
	},
	
	template: JST['members/new'],
		
  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  },
	
	add: function (event) {
		var that = this;
		event.preventDefault();
		var newMemberEmail = $('form').serializeJSON().new_member_email;
    this.model.save({ 'newMemberEmail': newMemberEmail });
		this.collection.trigger('add');
	},
	
	cancel: function (event) {
		event.preventDefault();
		this.collection.trigger('add');
	}
});