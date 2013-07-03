// Model is the board being shown.
// Collection is the board's lists.


Trellino.Views.BoardShow = Backbone.View.extend({
  
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  
	events: {
		"click button.newList": "addList",
    "click span.list_entry": "renameList",
    "click span.card_entry": "showCard"
	},
	
	template: JST['boards/show'],
		
  render: function () {
		var that = this;
    var renderedContent = this.template({
			board: this.model
    });
    this.$el.html(renderedContent);
		
		this.collection.each(function (list) {
			var cardsIndexView = new Trellino.Views.CardsIndex({
				model: list,
				collection: list.get('cards')
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
    var cardID = $(event.target).attr('id');
    var listID = $(event.target).attr('data-id');
    
    var cardList = this.collection.get(listID);
    var selectedCard = cardList.get('cards').get(cardID);
    var cardShowView = new Trellino.Views.CardShow({
      model: selectedCard
    });
    $('.overlay').toggleClass('hidden');
    $('.overlay').append(cardShowView.render().$el);
  }
  	
});