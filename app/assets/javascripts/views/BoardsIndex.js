Trellino.Views.BoardsIndex = Backbone.View.extend({
	events: {},
	
	template: JST['boards/index'],
	
	initialize: function () {
	// set up listeners	
	},
	
    render: function () {
      var renderedContent = this.template({
        boards: this.collection
      });

      this.$el.html(renderedContent);

      return this;
    }
	
});