Trellino.Views.CardsIndex = Backbone.View.extend({
	
	// Collection is the cards. Model is the list they belong to.
	
	// Removing a card should trigger another function:
	// upgrading by one the rank of all the cards
	// whose rank is lower than than the deleted card's.
	
	initialize: function() {
		this.listenTo(this.collection, 'sync', this.render),
		this.listenTo(this.collection, 'remove', this.render)
	},
	
	events: {
		"click button.delete": "delete",
		"click button.new": "new"
	},
	
	template: JST['cards/index'],
		
  render: function () {
    var renderedContent = this.template({
      cards: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
	
	delete: function (event) {
		var cardID = $(event.target).attr('data-id');
		var deletableCard = this.collection.get(cardID);
		deletableCard.destroy();
		this.collection.remove(deletableCard);
	},
	
	new: function (event) {
		var that = this;
		$(event.target).toggleClass('hidden');
		var newCardView = new Trellino.Views.CardNew({
			collection: that.model.get('cards'),
			model: that.model
		});
		$(event.target).parent().append(newCardView.render().$el);
	}
	
});