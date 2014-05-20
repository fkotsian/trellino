Trellino.Views.BoardsIndexView = Backbone.CompositeView.extend({

  template: JST['boards/index'],
  initialize: function() {
    this.listenTo(this.collection, 'sync add remove delete', this.render);
    // this.listenTo(this.collection.lists(), 'sync add remove', this.render);

    // this.collection.each(this.addBoard.bind(this));

    var boardNew = new Trellino.Views.BoardNewView({  });
    this.addSubview(".board-new", boardNew.render());

  },

  addBoard: function (board) {
    var boardShow = new Trellino.Views.BoardShowView({ model: board });
    this.addSubview("#boards", boardShow.render());
  },

  removeBoard: function (board) {
    var subview = _.find(this.subviews('#boards'), function(subview) {
      return subview.model === board;
    });

    this.removeSubview("#boards", subview);
  },

  events: {
    'click .new-board-link': 'newBoard'
  },

  render: function() {
    var indexContent = this.template();
    this.$el.html(indexContent);
    // this.attachSubviews();
    console.log('rendering the index')

    var that = this;
    this.collection.each(function(board){
      var board_link_address = "#/boards/" + board.get('id');
      that.$el.find('#boards').append(
        "<li><a href=" + board_link_address + ">" +
          board.escape('title') + "</a></li>");
    });

    return this;
  },

  newBoard: function(event) {
    Trellino.router.navigate('/boards/new', { trigger: true });
  },

});