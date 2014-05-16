Trellino.Routers.AppRouter = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'boardsIndex',
    '/boards/new': 'newBoard'
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
    console.log('in da newboard route')
    var newBoardView = new Trellino.Views.NewBoardView({});
    this._swapView(newBoardView);
  },

  _swapView: function(newView){
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    this.$rootEl.html(newView.render().$el);
  }

})