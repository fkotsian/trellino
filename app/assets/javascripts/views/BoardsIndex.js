Trellino.Views.BoardsIndex = Backbone.View.extend({
	
	initialize: function () {
		this.listenTo(this.collection, 'remove', this.render);
	},
	
	events: {
		"click button.delete": "delete"
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
		var postID = $(event.target).attr('data-id');
		var deletableBoard = this.collection.get(postID);
		deletableBoard.destroy();
	}
	
});