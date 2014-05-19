Trellino.Views.ListNewView = Backbone.View.extend({
  template: JST['lists/new_list'],

  events: {},

  render: function() {
    var templateContent = this.template({  });
    this.$el.html(templateContent);
    return this;
  },

  initialize: function() {
    //implement listeners
  },
})