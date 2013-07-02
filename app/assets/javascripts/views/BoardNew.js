Trellino.Views.BoardNew = Backbone.View.extend({
	events: {
		"click input[type='submit']": "create"
	},
	
	template: JST['boards/new'],
	
	initialize: function () {
	// listener to submit new board
	},
	
  render: function () {
    var renderedContent = this.template({
			board: this.model,
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	create: function (event) {
		var that = this;
		event.preventDefault();
		var newBoardAttrs = $('form').serializeJSON();

		this.collection.create(newBoardAttrs, {
			success: function (savedBoard, other) {
				var newBoardURL = "boards/" + savedBoard.id;
				Trellino.boardsRouter.navigate(newBoardURL, {trigger: true});
			}
		});
	},
	
});