window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
	  Trellino.boards = new Trellino.Collections.Boards();
		
		var bootstrappedBoards = JSON.parse($("#bootstrapped_boards_json").html());	
		_(bootstrappedBoards).each(function (boardObject) {
			Trellino.boards.add(boardObject)
		});
	  
	  Trellino.boardsRouter = new Trellino.Routers.Boards({
		  $rootEl: $('#content')
	  });
	  Backbone.history.start();
  }
};