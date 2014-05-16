window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Trellino.boards = new Trellino.Collections.Boards();

    new Trellino.Routers.AppRouter({
      '$rootEl': $('#content')
    });
    Backbone.history.start();
  }
};

$(function() {
  Trellino.initialize()
});
