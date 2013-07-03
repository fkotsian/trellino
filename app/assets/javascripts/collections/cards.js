Trellino.Collections.Cards = Backbone.Collection.extend({
	model: Trellino.Models.Card,
	url: "/cards",
  
  comparator: function (card) {
    return card.get('rank');
  }
});