Trellino.Collections.Lists = Backbone.Collection.extend({
  model: Trellino.Models.List,
  url: '/boards/:board_id/lists',

  tagName: 'ul',
  className: 'board-list',
  attributes: {
    // 'board-id': this.board.get('id')
  },

  comparator: function sortBy(model) {
    return model.rank;
  },

})