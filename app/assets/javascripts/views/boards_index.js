Trellino.Views.BoardsIndexView = Backbone.View.extend({

  template: JST['boards/index'],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },

  events: {
    'click .new-board-link': 'newBoard'
  },

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