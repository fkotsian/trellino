window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
	  Trellino.boards = new Trellino.Collections.Boards();
	  
	  new Trellino.Routers.Boards({
		  $rootEl: $('#content')
	  });
	  Backbone.history.start();
  }
};


$(function(){
Trellino.initialize()	
});
