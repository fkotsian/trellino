Trellino.Models.List = Backbone.Model.extend({
  urlRoot: '/boards/:board_id/lists/:id',
  title: 'Default List Title',

  parse: function(json){
    if (json.cards) {
      this.cards().set(json.cards);
      delete json.cards;
    }

    return json;
  },

  cards: function() {
    if (!this.cards) {
      this.cards = new Trellino.Collections.Cards([], {
        board: this
      });
    }

    return this.cards;
  },


})