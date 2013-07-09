Trellino.Views.CardsIndex = Backbone.View.extend({
	
	// Collection is the cards. Model is the list they belong to.
		
	initialize: function() {
		this.listenTo(this.collection, 'add', this.render),
		this.listenTo(this.collection, 'remove', this.render)
	},
	
	events: {
    "mouseover li.card_entry": "showDelete",
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
    
    var $placeholder = this.$el.find('li.placeholder');
    if (this.collection.length == 0) {
      $placeholder.removeClass('hidden');
    } else {
      $placeholder.addClass('hidden');
    }
    
    this.$("ul.card_list").sortable({
      items: "> .card_entry",
      placeholder: "card_placeholder",
      tolerance: 'pointer',
      connectWith: "ul.card_list",
      start: function (event, ui) {
        $(ui.item).toggleClass('dragged');
        var cardHeight = $(ui.item).height();
        var cardWidth = $(ui.item).width();
        that.$("li.card_placeholder").height(cardHeight);
        that.$("li.card_placeholder").width(cardWidth);
      },
      receive: function (event, ui) {
        var movedCardID = ui.item.data('id');
        var movedCard = Trellino.cards.get(movedCardID);
        movedCard.set({ list_id: that.model.id });
        that._realignList($(event.target));
        movedCard.save();
        that.collection.add(movedCard);
        var $placeholder = that.$el.find('li.placeholder');
        $placeholder.addClass('hidden');
      },
      stop: function (event, ui) {
        $(ui.item).toggleClass('dragged');
        var movedCardID = ui.item.data('id');
        var movedCard = Trellino.cards.get(movedCardID);
        if (that.model.id != movedCard.get('list_id')) {
          that.collection.remove(movedCardID);
        }
        that._realignList($(event.target));
      }
    });
    return this;
  },
  
  showDelete: function (event) {
    $(event.target).find('button.deleteCard').toggleClass('hidden');
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
    if (this.collection.length == 0) {
      var $placeholder = this.$el.find('li.placeholder');
      $placeholder.removeClass('hidden');
    }
    this._realignList($(event.target));
	},
  
  _realignList: function ($ul) {
    var listItems = $ul.find('li');
    var length = listItems.length;
    
    if (length === 1) {
      var $placeholder = this.$el.find('li.placeholder');
      $placeholder.removeClass('hidden');
    }
    
    $(listItems).each(function (index, item) {
      if ($(item).hasClass("placeholder")) {
        null
      } else {
        var card = Trellino.cards.get($(item).data('id'));
        card.set({ rank: index + 1 });
        card.save({silent: true});
      }
    })
  }
});