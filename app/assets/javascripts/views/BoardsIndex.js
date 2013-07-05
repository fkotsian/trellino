Trellino.Views.BoardsIndex = Backbone.View.extend({
	
	initialize: function () {
		this.listenTo(this.collection, 'remove', this.render);
	},
		
	template: JST['boards/index'],
		
  render: function () {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	delete: function (event) {
		var boardID = $(event.target).attr('data-id');
		var deletableBoard = this.collection.get(boardID);
		deletableBoard.destroy();
	}
	
});