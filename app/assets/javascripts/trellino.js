window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {    
    
    Trellino.myID = parseInt($("#bootstrapped_user_id").html());
    
	  Trellino.boards = new Trellino.Collections.Boards();
		var bootstrappedBoards = JSON.parse($("#bootstrapped_boards_json").html());
		_(bootstrappedBoards).each(function (boardObject) {
			Trellino.boards.add(boardObject, {parse: true});
		});
    
    
    $('ul.nav').append("\
    <li class='dropdown'>\
      <a\
        class='dropdown-toggle'\
        id='dLabel'\
        role='button'\
        data-toggle='dropdown' data-target='#'\
        href='#'\
      >\
      My Boards\
      <b class='caret'></b>\
      </a>\
      <ul\
        class='dropdown-menu'\
        id='boards-menu'\
        role='menu'\
        aria-labelledby='dLabel'\
      >\
      </ul>\
    </li>\
    <li>\
      <a href='#/cards'>My Cards</a>\
    </li>\
    ")
        
    Trellino.boards.each(function (board) {
      $('#boards-menu').append("<li>" +
                              "<a href='#boards/" +
                              board.id + "'>" +
                              board.escape('title') +
                              "</a></li>");
    });
    
    $('#boards-menu').append("<li class='divider'></li>");
    $('#boards-menu').append("<li><a href='#'>See All</a></li>");
    $('#boards-menu').append("<li><a href='#boards/new'>New Board</a></li>");
    
    $('.dropdown-toggle').on('click', function (event) {
      $('.dropdown-toggle').dropdown();
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