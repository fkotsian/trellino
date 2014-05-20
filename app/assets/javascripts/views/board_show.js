Trellino.Views.BoardShowView = Backbone.CompositeView.extend({
  template: JST['boards/show'],

  className: 'board',
  attributes: {
    // 'data-id': this.boardID()
  },

  initialize: function(options) {
    this.model = options.model;

    this.model.lists().each(this.addList.bind(this));

    this.listenTo(this.model, 'sync add remove', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model.lists(), 'sync add remove', this.render);
  },

  boardID: function() {
    this.model.get('id');
  },

  addList: function (list) {
    console.log('adding list to lists()')
    var listShow = new Trellino.Views.ListShowView({ model: list });
    this.addSubview('.lists', listShow.render());
  },

  events: {
    'click button.new-list-button': 'newListForm',
    'click button.cancel-new-list': 'removeListForm',
    'click button.submit-list': 'createList',
    'click button.member-add-button': 'showMemberSearch',
    'click button.cancel-member-search': 'removeMemberForm',
    'click input.submit-member': 'handleMemberForm',
    'click button.delete-board': 'deleteBoard',
    'click button.boards-index-link': 'boardsIndex',
  },

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);
    console.log('rendering boardShow')

    var that = this;
    this.model.lists().each(function(list) {
      that.attachSubviews();
    })

    return this;
  },

  leave: function() {
    this.subviews().forEach(function(subview) {
      subview.leave();
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
    var $form = $(event.target).parent();
    $form.parent().find('.new-list-button').toggleClass('showForm');
    $form.remove();
  },

  boardsIndex: function() {
    Trellino.router.navigate('', { trigger: true });
  },

  showMemberSearch: function(event) {
    var form = JST['boards/member_search']({ board: this.model });
    $(event.target).parent().append(form);
    $(event.target).toggleClass('showForm');
  },

  removeMemberForm: function(event) {
    event.preventDefault();
    var $form = $(event.target).parent();
    $form.parent().find('.member-add-button').toggleClass('showForm');
    $form.remove();
  },

  handleMemberForm: function(resp) {
    event.preventDefault();
    var formData = $(event.target).parent().serializeJSON();

    $.ajax({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      url: this.model.url(),
      type: 'PATCH',
      data: formData,
      success: function(response) {
        console.log('Member patch successful');
      },
      error: function(response, errorThrown) {
        console.log('Error: ' + errorThrown);
      },
      complete: function() {
        console.log('Patch ran')
      }
    });
    //
    // this.model.members.push
    // Trellino.router.navigate('boards/' + this.model.id);
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

  deleteBoard: function(event) {
    // this.leave()
    this.model.destroy();
    Trellino.router.navigate('', { trigger: true });
  },

});