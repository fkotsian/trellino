Trellino.Views.BoardsIndexView = Backbone.View.extend({
  events: {
    'click .new-board-link': 'navigateToNewBoard',
  },

  template: JST['boards/index'],

  render: function() {
    var indexContent = this.template();
    this.$el.html(indexContent);

    var that = this;
    this.collection.each(function(board){
      that.$el.find('#boards-list').append("<li>" + board.escape('title') + "</li>");
    });

    return this;
  },

  navigateToNewBoard: function(event) {
    Trellino.AppRouter.navigateTo('/new_board');
  },

});