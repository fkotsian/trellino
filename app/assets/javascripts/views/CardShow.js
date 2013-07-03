// Model is the card being shown.


Trellino.Views.CardShow = Backbone.View.extend({
    
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
    
	events: {
    "click span.cardProp": "editCard",
		"click button.closeCard": "closeCard"
	},
	
	template: JST['cards/show'],
		
  render: function () {
		var that = this;
    var renderedContent = this.template({
			card: this.model
    });
    this.$el.html(renderedContent);
		
    return this;
  },
  
  editCard: function (event) {
    var cardProp = $(event.currentTarget).attr('data-id');
    
    var editCardView = new Trellino.Views.CardEdit({
      model: this.model,
    });
    editCardView.cardProp = cardProp;
    
    $(event.target).html(editCardView.render().$el);
  },
  
  closeCard: function (event) {
    event.preventDefault();
    this.$el.remove();
  }	
});