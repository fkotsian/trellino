Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board',
  attributes: {
    // 'data-id': this.boardID()
  },

  initialize: function(options) {
    this.model = options.model;
    this.subViews = (options.subViews || []);

    this.model.lists().each(this.addList.bind(this));

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.lists(), 'sync add remove', this.render)
  },

  boardID: function() {
    this.model.get('id');
  },

  addList: function (list) {
    var listShow = Trellino.Views.ListNewView({ model: list });
    this.addSubview('.lists', listShow.render());
  },

  events: {
    'click button.new-list-button': 'newListForm',
    'click button.cancel-new-list': 'removeListForm',
    'click button.submit-list': 'createList',
    'click button.boards-index-link': 'boardsIndex',
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    var that = this;
    this.model.lists().each(function(list) {
      that.attachSubviews();
      // var listView = new Trellino.Views.ListShowView({ model: list });
      // that.subViews.push(listView);
      // that.$('ul').append(listView.render().$el);
    })

    return this;
  },

  leave: function() {
    this.subViews.forEach(function(subView) {
      subView.leave();
    });
    this.remove();
  },


  newListForm: function(event) {
    console.log( 'appending?')
    var form = JST['lists/new_list']({ board: this.model });
    $(event.target).toggleClass('showForm')
    $(event.target).parent().append(form);
  },

  removeListForm: function(event) {
    event.preventDefault();
    // debugger
    var $form = $(event.target).parent();
    $form.parent().find('.new-list-button').toggleClass('showForm');
    $form.remove();
  },

  boardsIndex: function() {
    Trellino.router.navigate('', { trigger: true });
  },

  createList: function(event) {
    event.preventDefault();
    var $form = $(event.target).parent();

    var formData = $form.serializeJSON();
    this.model.lists().create(formData, {
      success: function(resp) {
        console.log("Successfully created list");
        // Trellino.router.navigate // no need to navigate, just render
      },
      error: function(resp) {
        console.log("Error in creating list: " + resp);
      }
    })

  },

});