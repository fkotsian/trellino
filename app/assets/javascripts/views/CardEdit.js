Trellino.Views.CardEdit = Backbone.View.extend({
  
  // Model is the card being edited.

  events: {
    "click input[type='submit']": "update",
    "click button#cancel": "cancel"
  },

  template: JST['cards/edit'],
	
  render: function () {
    var renderedContent = this.template({
      card: this.model,
      prop: this.cardProp
    });

    this.$el.html(renderedContent);
    return this;
  },
	
  update: function (event) {
    var that = this;
    var cardProp = this.cardProp;
    event.preventDefault();
    var cardAttr = $('form').find('#card_' + cardProp).val();
    this.model.set(cardProp, cardAttr);
    if (this.model.save) {
      this.model.trigger('sync');
    } else {
      this.$('input[type="text"]').effect("highlight", {}, 500)
    }
  },

  cancel: function (event) {
    event.preventDefault();
    this.model.trigger('sync');
  }
});