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
    
    Trellino.cards = new Trellino.Collections.Cards();
    var bootstrappedCards = JSON.parse($("#bootstrapped_cards_json").html());
		_(bootstrappedCards).each(function (cardObject) {
			Trellino.cards.add(cardObject)
		});
	  
	  Trellino.boardsRouter = new Trellino.Routers.Boards({
		  $rootEl: $('#content')
	  });
	  Backbone.history.start();
  }
};