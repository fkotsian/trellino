Trellino.Models.Board = Backbone.Model.extend({
  initialize: function () {
    this.lists = new Trellino.Collections.Lists()
  },
  
  parse: function (response) {
    var members = new Trellino.Collections.Users();
    _(response.members).each(function (member) {
      members.add(member);
    })
    response.members = members;
    
    return response;
  }
});