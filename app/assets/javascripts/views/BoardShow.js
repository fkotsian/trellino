Trellino.Views.BoardShow = Backbone.View.extend({
	events: {},
	
	template: JST['boards/show'],
	
	initialize: function () {
	// listeners	
	},
	
    render: function () {
      var renderedContent = this.template({
				board: this.model,
        lists: this.collection
      });

      this.$el.html(renderedContent);

      return this;
    }
	
});