Trellino.Views.CardsIndex = Backbone.View.extend({
	
	events: {
		"click button.delete": "delete"
	},
	
	template: JST['cards/index'],
		
  render: function () {
		console.log(this.collection);
    var renderedContent = this.template({
      cards: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	delete: function (event) {
		console.log(event);
	}
	
});