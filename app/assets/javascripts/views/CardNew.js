Trellino.Views.CardNew = Backbone.View.extend({
	
	// Model is the list receiving a new card. Collection is the list's cards.
	
	events: {
		"click input[type='submit']": "create",
		"click button.cancel": "cancel"
	},
	
	template: JST['cards/new'],
		
  render: function () {
		var newCardRank = this.collection.models.length + 1;
    var renderedContent = this.template({
			card: new Trellino.Models.Card(),
			rank: newCardRank,
			listID: this.model.id
    });

    this.$el.html(renderedContent);

    return this;
  },
	
	create: function (event) {
		var that = this;
		event.preventDefault();
		var newCardAttrs = $('form').serializeJSON().card;
		this.collection.create(newCardAttrs);
	},
	
	cancel: function (event) {
		event.preventDefault();
		this.collection.trigger('add');
	}
});