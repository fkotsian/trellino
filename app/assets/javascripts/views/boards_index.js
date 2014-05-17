Trellino.Views.BoardsIndexView = Backbone.View.extend({
  events: {
    'click .new-board-link': 'newBoard'
  },

  template: JST['boards/index'],

  render: function() {
    var indexContent = this.template();
    this.$el.html(indexContent);

    var that = this;
    this.collection.each(function(board){
      var board_link_address = "#/boards/" + board.get('id');
      that.$el.find('#boards-list').append(
        "<li><a href=" + board_link_address + ">" +
          board.escape('title') + "</a></li>");
    });

    return this;
  },

  newBoard: function(event) {
    Trellino.router.navigate('/boards/new', { trigger: true });
  }

});