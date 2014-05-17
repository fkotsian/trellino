Trellino.Views.BoardShowView = Backbone.View.extend({
  template: JST['boards/show'],

  initialize: function(options) {
    this.model = options.model;
    this.subViews = (options.subViews || []);

    this.listenTo(this.model, 'sync', this.render);
  },

  boardID: function() {
    this.model.get('id');
  },

  className: 'board',
  attributes: {
    // 'data-id': this.boardID()
  },
  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent);

    var that = this;
    this.model.lists().each(function(list) {
      var listView = new Trellino.Views.ListView({ model: list });
      that.subViews.push(listView);
      that.$('ul').append(listView.render().$el);
    })

    return this;
  },

  leave: function() {
    this.subViews.forEach(function(subView) {
      subView.leave();
    });
    this.remove();
  },

  events: {
    'click button.boards-index-link': 'boardsIndex',
  },

  boardsIndex: function() {
    Trellino.router.navigate('', { trigger: true });
  },



});