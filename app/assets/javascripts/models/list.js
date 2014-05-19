Trellino.Models.List = Backbone.Model.extend({
  // urlRoot: '/boards/:board_id/lists/:id',
  title: 'Default List Title',

  parse: function(json){
    if (json.cards) {
      this.cards().set(json.cards, { parse: true });
      delete json.cards;
    }

    return json;
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new Trellino.Collections.Cards([], {
        board: this
      });
    }

    return this._cards;
  },


})