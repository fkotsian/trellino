Trellino.Views.CardsIndex = Backbone.View.extend({
	
	// Collection is the cards. Model is the list they belong to.
	
	// Removing a card should trigger another function:
	// upgrading by one the rank of all the cards
	// whose rank is lower than than the deleted card's.
	
	initialize: function() {
		this.listenTo(this.collection, 'sync', this.render),
		this.listenTo(this.collection, 'remove', this.render)
    this.listenTo(this.collection, 'remove', this.normalizeRanks)
	},
	
	events: {
		"click button.deleteCard": "deleteCard",
		"click button.addCard": "addCard"
	},
	
	template: JST['cards/index'],
		
  render: function () {
    var renderedContent = this.template({
      cards: this.collection
    });
    this.$el.html(renderedContent);
    return this;
  },
		
	addCard: function (event) {
		var that = this;
		$(event.target).toggleClass('hidden');
		var newCardView = new Trellino.Views.CardNew({
			collection: that.model.get('cards'),
			model: that.model
		});
		$(event.target).parent().append(newCardView.render().$el);
	},
  
	deleteCard: function (event) {
		var cardID = $(event.target).attr('data-id');
		var cardToDelete = this.collection.get(cardID);
		cardToDelete.destroy();
		this.collection.remove(cardToDelete);
	},
  
  normalizeRanks: function (deletedCard, collection) {
    var deletedCardRank = deletedCard.get('rank');
    if (deletedCardRank === collection.models.length + 1) {
      return
    } else {
      collection.each(function (card) {
        var cardRank = card.get('rank');
        if (cardRank > deletedCardRank) {
          card.set({rank: cardRank - 1});
          card.save();
        }
      });
    }
  }
	
});