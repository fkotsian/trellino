Trellino.Views.CardUserNew = Backbone.View.extend({
	
	// Model is the card receiving a new user.
	
	events: {
		"click input[type='submit']": "add",
		"click button.cancel": "cancel"
	},
	
	template: JST['cards/new_user'],
		
  render: function () {
    var cardBoard = Trellino.boards.get(this.model.get('board').id);
    var boardMembers = cardBoard.get('members');
    var cardUsers = this.model.get('users');
    
    var elegibleMembers = [];
    boardMembers.each(function (member) {
      if (!cardUsers.get(member.id)) {
        elegibleMembers.push(member);
      }
    })
    var renderedContent = this.template({
      elegibleMembers: elegibleMembers
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	add: function (event) {
		var that = this;
		event.preventDefault();
		var newUserEmail = $('form').serializeJSON().new_user_email;
    this.model.save({ 'newUserEmail': newUserEmail });
	},
	
	cancel: function (event) {
		event.preventDefault();
		this.model.trigger('sync');
	}
});