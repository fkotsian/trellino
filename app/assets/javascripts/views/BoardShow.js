Trellino.Views.BoardShow = Backbone.View.extend({
	events: {},
	
	template: JST['boards/show'],
	
	initialize: function () {
	// listeners	
	},
	
    render: function () {
			var that = this;
      var renderedContent = this.template({
				board: this.model
      });

      this.$el.html(renderedContent);
			
			this.model.lists.each(function (list) {
				var cardsIndexView = new Trellino.Views.CardsIndex({
					collection: list.get('cards')
				});
				
				that.$el.find('li #list_' + list.id).append(cardsIndexView.render().$el)
			});

      return this;
    }
	
});