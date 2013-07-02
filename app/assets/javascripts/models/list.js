Trellino.Models.List = Backbone.Model.extend({
	
	parse: function (response) {		
		var cards = response.cards
		response.cards = new Trellino.Collections.Cards();
		
		_(cards).each(function (cardAttrs) {
			var newCard = new Trellino.Models.Card(cardAttrs);
			response.cards.add(newCard);
		})
		
		return response;
	}
	
});