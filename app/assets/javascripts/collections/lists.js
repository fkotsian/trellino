Trellino.Collections.Lists = Backbone.Collection.extend({
	model: Trellino.Models.List,
	url: function () {
		return "boards/" + this.boardID + "/lists"
	},
  
  comparator: function (list) {
    return list.get('rank');
  }
});