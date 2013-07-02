Trellino.Views.BoardsIndex = Backbone.View.extend({
	
	events: {
		"click button.delete": "delete"
	},
	
	template: JST['cards/index'],
		
  render: function () {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	delete: function (event) {
		console.log(event);
	}
	
});