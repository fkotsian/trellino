Trellino.Models.List = Backbone.Model.extend({
  initialize: function () {
    this.cards = new Trellino.Collections.Cards();
  },

  normalizeRanks: function (deletedCard, collection) {
    console.log("HEY THERE BROTHER")
    var deletedCardRank = deletedCard.get('rank');
    if (deletedCardRank === collection.models.length + 1) {
      return
    } else {
      collection.each(function (card) {
        var cardRank = card.get('rank');
        if (cardRank > deletedCardRank) {
          card.set({rank: cardRank - 1});
          card.save();
        }
      });
    }
  }

});