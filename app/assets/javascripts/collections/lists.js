Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  url: function() {
    console.log('getting URL in collection')
    return this.board.url() + '/lists'
  },

  comparator: function sortBy(model) {
    return model.rank;
  },

  initialize: function(models, options) {
    this.board = options.board;
  }
})