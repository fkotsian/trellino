Trellino.Views.CardsIndex = Backbone.View.extend({
	
	// Collection is the cards. Model is the list they belong to.
		
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
    var that = this;
    var renderedContent = this.template({
      cards: this.collection,
      list: this.model
    });
    this.$el.html(renderedContent);
    this.$("ul.card_list").sortable({
      connectWith: "ul.card_list",
      receive: function (event, ui) {
        var destinationList = that.model;
        var targetListID = $(event.target).data('list_id');
      },
      stop: function (event, ui) {
        // This code is supposed to remove the card from its collection.
        // The collection is tied to the list that's losing a card.
        // However the receive, which happens first, will add the card to another view's collection.
        // The sync() method won't work (says no url specified). Had similar problem with Dylan.
        var movedCard = that.collection.get(ui.item.data('id'));
        that.collection.remove(movedCard);
        movedCard.sync();
      }
    });
    
    return this;
  },
		
	addCard: function (event) {
		var that = this;
    $(event.target).remove();
		var newCardView = new Trellino.Views.CardNew({
			collection: that.model.get('cards'),
			model: that.model
		});
		this.$('ul.card_list').append(newCardView.render().$el);
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