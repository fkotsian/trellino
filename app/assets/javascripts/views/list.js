Trellino.Views.ListShowView = Backbone.CompositeView.extend({
  template: JST['lists/list'],

  events: {},

  tagName: 'li',
  className: 'list',
  attributes: {
    // 'data-id': this.model.get('id')
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    return this;
    // does not account for subViews(cards)
  },

  leave: function(){
    this.subviews().forEach(function(subView){
      subView.leave();
    });

    this.remove();
  },


})