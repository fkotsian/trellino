Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,
  url: 'api/lists/:list_id/cards',

  // tagName: 'li',
  // className: 'card',
  // attributes: {
  //   // 'list-id': this.list.get('id')
  // },

  comparator: function sortBy(model) {
    return model.rank;
  },

})