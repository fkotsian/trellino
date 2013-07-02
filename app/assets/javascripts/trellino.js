window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
	  Trellino.boards = new Trellino.Collections.Boards();
	  
	  Trellino.boardsRouter = new Trellino.Routers.Boards({
		  $rootEl: $('#content')
	  });
	  Backbone.history.start();
  }
};