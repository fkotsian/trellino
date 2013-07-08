// Model is the card receiving a new todo item

Trellino.Views.TodoItemNew = Backbone.View.extend({
  
	events: {
    "click input[type='submit']": "create",
		"click button.cancel": "cancel"
	},
  
  template: JST['todo_items/new'],
  
  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },
  
  create: function (event) {
		var that = this;
		event.preventDefault();
		var newTodoAttrs = $('form').serializeJSON().todo_item;
		this.collection.create(newTodoAttrs, {
      wait: true,
      error: function (data, xhr) {
        this.$('input[type="text"]').effect("highlight", {}, 500)
      }
    });
  },
  
  cancel: function (event) {
    event.preventDefault();
    this.model.trigger('sync');
  }
  
});