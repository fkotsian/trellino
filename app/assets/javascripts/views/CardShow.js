// Model is the card being shown.
// Collection is the card's todos


Trellino.Views.CardShow = Backbone.View.extend({
    
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
  },
    
	events: {
    "click span.cardProp": "editCard",
		"click button.closeCard": "closeCard",
    "click input[type='checkbox']": "checkBox",
    "click button.newTodo": "newTodo",
    "click button.deleteTodo": "deleteTodo"
	},
	
	template: JST['cards/show'],
		
  render: function () {
		var that = this;
    var renderedContent = this.template({
			card: this.model,
      todoItems: this.model.get('todo_items')
    });
    this.$el.html(renderedContent);
		
    return this;
  },
  
  editCard: function (event) {
    var cardProp = $(event.currentTarget).attr('data-id');
    
    if (cardProp == "todo_items") {
      return;
    } else {
      var editCardView = new Trellino.Views.CardEdit({
        model: this.model
      });
      editCardView.cardProp = cardProp;
    
      $(event.target).html(editCardView.render().$el);
    }
  },
  
  closeCard: function (event) {
    event.preventDefault();
    $('.overlay').toggleClass('hidden');
    this.$el.remove();
  },
  
  checkBox: function (event) {
    var itemID = $(event.target).data('id');
    var item = this.collection.get(itemID);
    var itemDone = !(item.get('done'));
    console.log(itemDone);
    item.set({ done: itemDone }); // somehow doesn't change the attr
    console.log(item);
    item.save(null, { silent: true });
  },
  
  newTodo: function (event) {
    var newTodoView = new Trellino.Views.TodoItemNew({
      model: this.model,
      collection: this.collection
    });
    $(event.target).toggleClass('hidden');
    this.$el.find("ul.todo_list").append(newTodoView.render().$el);
  },
  
  deleteTodo: function (event) {
    var itemID = $(event.target).data('id');
    var item = this.collection.get(itemID);
    item.destroy();
    this.collection.remove(itemID);
    this.collection.trigger('sync');
  }
  
});