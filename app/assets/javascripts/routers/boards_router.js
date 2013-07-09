Trellino.Routers.Boards = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
  "": "boardsIndex",
  "boards/new": "boardNew",
  "boards/:id": "boardShow",
  "cards": "cardsIndex"
  },
  
  boardsIndex: function () {
    var indexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.boards
    });
    this._swapView(indexView);    
  },
  
  boardNew: function () {
    var board = new Trellino.Models.Board()
    var newView = new Trellino.Views.BoardNew({
      collection: Trellino.boards,
      model: board
    })
    this._swapView(newView);
  },
  
  boardShow: function (id) {
    var board = Trellino.boards.get(id);
    var showView = new Trellino.Views.BoardShow({
        model: board,
        collection: board.lists
      });
    this._swapView(showView);
  },
  
  cardsIndex: function () {
    var myCardsView = new Trellino.Views.CardsUserIndex();
    this._swapView(myCardsView);
  },
      
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
});