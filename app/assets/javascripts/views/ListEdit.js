Trellino.Views.ListEdit = Backbone.View.extend({
  
  // Model is the board receiving a new list. Collection is the board's lists.

  events: {
    "click input[type='submit']": "update",
    "click button#cancel": "cancel"
  },

  template: JST['lists/edit'],
	
  render: function () {
    var listRank = this.model.get('rank');
    var renderedContent = this.template({
      list: this.model,
      rank: listRank,
      boardID: this.model.get('board_id')
    });

    this.$el.html(renderedContent);

    return this;
  },
	
  update: function (event) {
    var that = this;
    event.preventDefault();
    var listAttrs = $('form').serializeJSON().list;
    this.model.set(listAttrs);
    this.model.save()
  },

  cancel: function (event) {
    event.preventDefault();
    this.collection.trigger('sync');
  }
});