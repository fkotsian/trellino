Trellino.Views.BoardNew = Backbone.View.extend({
	events: {
		"click input[type='submit']": "create"
	},
	
	template: JST['boards/new'],
		
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
		var newBoardAttrs = $('form').serializeJSON().board;
		this.collection.create(newBoardAttrs, {
      wait: true,
			success: function (savedBoard) {
				var newBoardURL = "#boards/" + savedBoard.id;
        Trellino.boardsRouter.navigate(newBoardURL, { trigger: true });
			},
      error: function (data, xhr) {
        that.$('input[type="text"]').effect("highlight", {}, 500)
      }
		});
	},
	
});