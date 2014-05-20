Trellino.Collections.Cards = Backbone.Collection.extend({
  model: Trellino.Models.Card,
  url: 'api/lists/:list_id/cards',

  comparator: function sortBy(model) {
    return model.rank;
  },

  initialize: function(models, options) {

  },

})