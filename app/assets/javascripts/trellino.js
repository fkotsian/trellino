window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
	  Trellino.boards = new Trellino.Collections.Boards();
		var bootstrappedBoards = JSON.parse($("#bootstrapped_boards_json").html());
		_(bootstrappedBoards).each(function (boardObject) {
			Trellino.boards.add(boardObject);
		});
    
	  Trellino.lists = new Trellino.Collections.Lists();
		var bootstrappedLists = JSON.parse($("#bootstrapped_lists_json").html());
		_(bootstrappedLists).each(function (listObject) {
			Trellino.lists.add(listObject);
		});
    
    Trellino.cards = new Trellino.Collections.Cards();
    var bootstrappedCards = JSON.parse($("#bootstrapped_cards_json").html());
		_(bootstrappedCards).each(function (cardObject) {
			Trellino.cards.add(cardObject, {parse: true});
		});
    
    Trellino.boards.each(function (board) {
      board.lists.add(Trellino.lists.where({board_id: board.id}));
    })
    
    Trellino.lists.each(function (list) {
      list.cards.add(Trellino.cards.where({list_id: list.id}));
    })
    
	  
	  Trellino.boardsRouter = new Trellino.Routers.Boards({
		  $rootEl: $('#content')
	  });
	  Backbone.history.start();
  }
};