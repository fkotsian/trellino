Trellino.Views.ListNew = Backbone.View.extend({
  
  // Model is the board receiving a new list. Collection is the board's lists.

  events: {
    "click input[type='submit']": "create",
    "click button#cancel": "cancel"
  },

  template: JST['lists/new'],
	
  render: function () {
    var newListRank = this.collection.models.length + 1;
    var renderedContent = this.template({
      list: new Trellino.Models.List(),
      rank: newListRank,
      boardID: this.model.id
    });

    this.$el.html(renderedContent);

    return this;
  },
	
  create: function (event) {
    var that = this;
    event.preventDefault();
    var newListAttrs = $('form').serializeJSON().list;
    this.collection.create(newListAttrs);
  },

  cancel: function (event) {
    event.preventDefault();
    this.collection.trigger('sync');
  }
});