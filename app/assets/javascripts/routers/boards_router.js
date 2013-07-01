Trellino.Routers.Boards = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},
	
	routes: {
	"boards": "index",
	},
	
	index: function () {
		console.log('indexing');
		var that = this;
		Trellino.boards.fetch({
			success: function () {
				var indexView = new Trellino.Views.BoardsIndex({
					collection: Trellino.boards
				});
				that._swapView(indexView);
			}
		});
	},
	
	
	
	_swapView: function (view) {
	    this._currentView && this._currentView.remove();
	    this._currenView = view;
	    this.$rootEl.html(view.render().$el);
	  }
});