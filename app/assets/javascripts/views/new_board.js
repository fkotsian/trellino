Trellino.Views.NewBoardView = Backbone.View.extend({
  template: JST['boards/new_board'],

  events: {
    'click input#board-create-button': 'handleForm'
  },

  handleForm: function(event) {
    event.preventDefault();
    var formData = $(event.target).parent().serializeJSON();
    console.log(formData);

    Trellino.boards.create(formData, {
      success: function(resp) {
        console.log("New board successfully created");
        Trellino.router.navigate('/boards/' + resp.get('id'), { trigger: true });
      },
      error: function(resp) {
        console.log("Error in creating new board: " + resp);
      }
    });
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  initialize: function() {}
})