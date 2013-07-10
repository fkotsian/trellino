Trellino.Views.CardsUserIndex = Backbone.View.extend({
		
	initialize: function() {
    var myCards = new Trellino.Collections.Cards();
    Trellino.cards.each(function (card) {
      var isMyCard = card.get('users').where({ id: Trellino.myID }).length > 0;
      if (isMyCard) {
        myCards.add(card);
      }
    });
    this.collection = myCards;
    
		this.listenTo(this.collection, 'add', this.render),
		this.listenTo(this.collection, 'remove', this.render)
	},
	
	events: {
    "mouseover li.card_entry": "addDeleteButton",
    "mouseleave li.card_entry": "removeDeleteButton",
    "click li.card_entry": "showCard",
		"click span.deleteCard": "deleteCard"
	},
	
	template: JST['cards/user_index'],
		
  render: function () {
    var renderedContent = this.template({
      cards: this.collection
    });
    this.$el.html(renderedContent);
    
    var $placeholder = this.$el.find('li.placeholder');
    if (this.collection.length == 0) {
      $placeholder.removeClass('hidden');
    } else {
      $placeholder.addClass('hidden');
    }

    return this;
  },
  
  showCard: function (event) {
    var cardID = $(event.target).attr('data-id');
    var selectedCard = Trellino.cards.get(cardID);
    if (!selectedCard) {return;}
    var cardShowView = new Trellino.Views.CardShow({
      model: selectedCard,
      collection: selectedCard.get('todo_items')
    });
    
    $('.overlay').toggleClass('hidden');
    $('.overlay').append(cardShowView.render().$el);
  },
  
  addDeleteButton: function (event) {
    $(event.target).find('span.deleteCard').removeClass('hidden');
  },

  removeDeleteButton: function (event) {
    $(event.target).find('span.deleteCard').addClass('hidden');
  },
  
	deleteCard: function (event) {
		var cardID = $(event.target).attr('data-id');
		var cardToDelete = this.collection.get(cardID);
		cardToDelete.destroy();
		this.collection.remove(cardToDelete);
    if (this.collection.length == 0) {
      var $placeholder = this.$el.find('li.placeholder');
      $placeholder.removeClass('hidden');
    }
	}
  
});