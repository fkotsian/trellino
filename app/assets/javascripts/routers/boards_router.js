Trellino.Routers.Boards = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },
  
  routes: {
  "": "boardsIndex",
  "boards/new": "boardNew",
  "boards/:id": "boardShow"
  },
  
  boardsIndex: function () {
    var that = this;
    
    var indexView = new Trellino.Views.BoardsIndex({
      collection: Trellino.boards
    });
    that._swapView(indexView);    
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
    var that = this;
    var board = Trellino.boards.get(id);
    board.lists = new Trellino.Collections.Lists();
    board.lists.boardID = id;
    board.lists.fetch({
      success: function (data) {
        var showView = new Trellino.Views.BoardShow({
          model: board,
          collection: board.lists
        })
        that._swapView(showView);
      }
    });
  },
      
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currenView = view;
    this.$rootEl.html(view.render().$el);
  }
});