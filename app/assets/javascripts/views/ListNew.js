Trellino.Views.ListNew = Backbone.View.extend({
	
	// Model is the list receiving a new card. Collection is the list's cards.
	
	events: {
		"click input[type='submit']": "add",
		"click button#cancel": "cancel"
	},
	
	template: JST['lists/new'],
		
  render: function () {
		var newListRank = this.collection.models.length + 1;
    var renderedContent = this.template({
			list: new Trellino.Models.List(),
			rank: newListRank,
			boardID: this.model.id
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	add: function (event) {
		var that = this;
		event.preventDefault();
		var newCardAttrs = $('form').serializeJSON().card;
		this.collection.create(newCardAttrs);
	},
	
	cancel: function (event) {
		event.preventDefault();
		this.collection.trigger('sync');
	}
});