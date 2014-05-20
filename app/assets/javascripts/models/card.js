Trellino.Models.Card = Backbone.Model.extend({

  urlRoot: '/api/boards',
  title: 'Default Title',

  initialize: function(title) {
    this.title = title;
  },

  parse: function(json){
    if (json.lists) {
      this.lists().set(json.lists, { parse: true });
      delete json.lists;
    }

    return json;
  },

  lists: function() {
    if (!this._lists) {
      this._lists = new Trellino.Collections.Lists([], {
        board: this
      });
    }

    return this._lists;
  }

});