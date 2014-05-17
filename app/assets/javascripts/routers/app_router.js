Trellino.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'boardsIndex',
    'boards/new': 'newBoard',
    'boards/:id': 'showBoard'
  },

  boardsIndex: function(){
    var that = this;

    Trellino.boards.fetch({
      success: function() {
        var boardsIndexView = new Trellino.Views.BoardsIndexView({
          collection: Trellino.boards,
        });

        that._swapView(boardsIndexView);
      },
      error: function(){
        console.log('Unable to fetch Trellino.boards');
      }
    });
  },

  newBoard: function(){
    var newBoardView = new Trellino.Views.NewBoardView({});
    console.log("in the router, getting a new board")
    this._swapView(newBoardView);
  },

  showBoard: function(id) {
    console.log('about to fetch: ' + id)
    var board = Trellino.boards.getOrFetch(id);
    var showBoardView = new Trellino.Views.BoardShowView({ model: board });
    this._swapView(showBoardView);
  },

  _swapView: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }

})