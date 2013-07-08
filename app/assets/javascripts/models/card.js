Trellino.Models.Card = Backbone.Model.extend({
  
  parse: function (response) {
    var todoItems = new Trellino.Collections.TodoItems();
    
    _(response.todo_items).each(function (item) {
      var todoItem = new Trellino.Models.TodoItem(item);
      todoItem.set({card_id: response.id});
      todoItems.add(item);
    });
    
    todoItems.card_id = response.id;
    
    response.todo_items = todoItems;
    return response;
  }
  
});