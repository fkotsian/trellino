Trellino.Collections.TodoItems = Backbone.Collection.extend({
	model: Trellino.Models.TodoItem,
  
	url: function () {
	  var cardID = this.card_id;
    return "/cards/" + cardID + "/todo_items"
	},
  
  comparator: function (item) {
    return item.get('created_at');
  }
});