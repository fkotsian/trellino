Trellino.Views.CardsIndex = Backbone.View.extend({
	
	// Collection is the cards. Model is the list they belong to.
		
	initialize: function() {
		this.listenTo(this.collection, 'add', this.render),
		this.listenTo(this.collection, 'remove', this.render)
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
        var movedCardID = ui.item.data('id');
        var movedCard = Trellino.cards.get(movedCardID);
        movedCard.set({ list_id: that.model.id });
        that.collection.add(movedCard);
        that._realignList($(event.target));
      },
      stop: function (event, ui) {
        that._realignList($(event.target));
      }
    });
    return this;
  },
		
	addCard: function (event) {
		var that = this;
    $(event.target).remove();
		var newCardView = new Trellino.Views.CardNew({
			collection: that.model.cards,
			model: that.model
		});
		this.$('ul.card_list').append(newCardView.render().$el);
	},
  
	deleteCard: function (event) {
		var cardID = $(event.target).attr('data-id');
		var cardToDelete = this.collection.get(cardID);
		cardToDelete.destroy();
		this.collection.remove(cardToDelete);
    this._realignList($(event.target));
	},
  
  _realignList: function ($ul) {
    var list = $ul.find('li');
    var length = list.length;
    
    $(list).each(function (index, item) {
      var card = Trellino.cards.get($(item).data('id'));
      card.set({ rank: index + 1 });
      card.save({silent: true}); // doesn't work!
    })
  }
});