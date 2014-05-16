Trellino.Views.NewBoardView = Backbone.View.extend({
  template: JST['boards/new_board'],

  render: function(){
    var renderedContent = template();
    this.$el.html(renderedContent);

    return this;
  },

  initialize: function() {}
})