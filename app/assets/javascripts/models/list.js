Trellino.Models.List = Backbone.Model.extend({
	
	parse: function (response) {		
		var cards = response.cards;
		var cardsCollection = new Trellino.Collections.Cards();
		
		_(cards).each(function (cardAttrs) {
			var newCard = new Trellino.Models.Card(cardAttrs);
			cardsCollection.add(newCard);
		})
		
		response.cards = cardsCollection;
		return response;
	}
});