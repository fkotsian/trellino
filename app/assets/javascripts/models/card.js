Trellino.Models.Card = Backbone.Model.extend({  
  
  parse: function (response) {
    var users = new Trellino.Collections.Users();
    _(response.users).each(function (user) {
      users.add(user);
    });
    
    response.users = users;
    
    var todoItems = new Trellino.Collections.TodoItems();
    todoItems.card_id = response.id;
    _(response.todo_items).each(function (item) {
      todoItems.add(item);
    });
    
    response.todo_items = todoItems;
    return response;
  }
});