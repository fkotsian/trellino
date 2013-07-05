// Model is the board being shown.
// Collection is the board's lists.


Trellino.Views.BoardShow = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, 'add', this.render)
  },
  
	events: {
		"click button.newList": "addList",
    "click span.list_entry": "renameList",
    "click li.card_entry": "showCard"
	},
	
	template: JST['boards/show'],
		
  render: function () {
		var that = this;
    var renderedContent = this.template({
			board: this.model,
      lists: this.collection
    });
    this.$el.html(renderedContent);
    
    this.$('ul.list_list').sortable({
      tolerance: 'pointer',
      start: function (event, ui) {
        $(ui.item).toggleClass('dragged');
      },
      stop: function (event, ui) {
        $(ui.item).toggleClass('dragged');
        that._realignBoard($(event.target));
      }
    });
		
		this.collection.each(function (list) {
			var cardsIndexView = new Trellino.Views.CardsIndex({
				model: list,
				collection: list.cards
			});
			var $cardsViewEl = cardsIndexView.render().$el;
			that.$el.find('li#list_' + list.id).append($cardsViewEl);
		});

    return this;
  },
	
	addList: function (event) {
		var that = this;
    $(event.target).toggleClass('hidden');
		var newListView = new Trellino.Views.ListNew({
      model: this.model,
      collection: this.collection
		});
		$(event.target).parent().append(newListView.render().$el);
	},
  
  renameList: function (event) {
    var selectedList = this.collection.get(($(event.target).attr('data-id')))

    if (selectedList){
      var editListView = new Trellino.Views.ListEdit({
        model: selectedList,
        collection: this.collection
      });
      $(event.target).html(editListView.render().$el);
    }
  },
  
  showCard: function (event) {
    var cardID = $(event.target).attr('data-id');
    var selectedCard = Trellino.cards.get(cardID);
    var cardShowView = new Trellino.Views.CardShow({
      model: selectedCard
    });
    
    $('.overlay').toggleClass('hidden');
    $('.overlay').append(cardShowView.render().$el);
  },
  
  _realignBoard: function ($ul) {
    var listItems = $ul.find('li');
    var length = listItems.length;
    
    var rankIndex = 1;
    $(listItems).each(function (index, item) {
      if ($(item).hasClass('list_entry')) {
        var list = Trellino.lists.get($(item).data('id'));
        list.set({ rank: rankIndex });
        list.save({silent: true});
        rankIndex++;
      }
    })
  }
  	
});