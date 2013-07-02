Trellino.Views.BoardShow = Backbone.View.extend({
	events: {},
	
	template: JST['boards/show'],
		
  render: function () {
		var that = this;
    var renderedContent = this.template({
			board: this.model
    });
    this.$el.html(renderedContent);
		
		this.model.lists.each(function (list) {
			var cardsIndexView = new Trellino.Views.CardsIndex({
				model: list,
				collection: list.get('cards')
			});
			var $cardsViewEl = cardsIndexView.render().$el;
			that.$el.find('li#list_' + list.id).append($cardsViewEl);
		});
		
    return this;
  }
});