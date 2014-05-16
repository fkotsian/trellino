Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',
  title: 'Default Title',

  initialize: function(title) {
    this.title = title;
  }
})