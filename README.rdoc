# Trello project!

Over the next few days, we're going to clone Trello. (This project was based off Simon Chaffetz's final project, which he called [Trellino](http://trellino.herokuapp.com/) so we could perhaps call it a Trellino clone.)

We've already provided authentication and a Rails API for you, so you just have to build the one page app.

Start out by looking at the skeleton provided for you. You'll probably look at the models in the following order: boards, lists, cards, todo items, then card assignments. Lists and cards have a rank attribute: this is the order they're shown in. At the end of this project, you'll be able to edit their order by dragging and dropping them.

## Phase I: Boards

* Start up Backbone
  * Make your Backbone model and collection for boards.
  * Make a trello.js file in your javascripts folder. In it, initialize Backbone.
  * Test out your Backbone model: if you use its `save` method, does that save the model to the database?
* Build a `BoardsIndex` view class. Its `render` function should put an unordered list of our boards on the page.
* Add a router: map "/" to the `BoardsIndex` class. At this point, you should be able to see all your boards on your index page.
* Add a delete button for each board. Make the view refresh after you delete boards.
* Add a new board view.

## Phase II: Lists

* On your index page, give every board a link to its show page.
* Make the show page. Add a Backbone route to it. For the moment, just have a board's show page contain the name of the board and a list of its lists. You can just display a list's name, given that at the moment it has no other content.
* Add the ability to create lists, via a new list view.

## Phase III: Cards (finally!)

* Make your board show page also show the cards for each list. You'll want to do this by adding functionality to the BoardShow.js render method.
* Make the lists appear next to each other by making each inside a div which you give the CSS setting `float: left`.
* Add the ability to create and delete cards. The card deletion should be accomplished by a button which only appears when you're hovering over the card. Use the JQuery hover event to get this effect.

## Phase IV: Javascript prettiness!

* The whole fun of Trello is the dragging and dropping of the to-do items and lists. We'll be using JQuery UI Sortable to accomplish this. [Read this example here](http://stackoverflow.com/a/15635201).
* First get that working on the client, and then send the result back to the server.
* To make it prettier, you can give the cards a `.dragged` CSS style which rotates them while they're being dragged.

## Phase V: Card modal view

* We want to make a modal view to focus on a particular card. To do this, we'll create an on click event for our cards. When you click on a card, it should make the rest of the window get greyed out, and also show the details of the card. Do this by displaying two divs.
  * The first div is to grey out the rest of the window. Just make it have a fixed height and width of 100%, and give it a semitransparent black color.
  * On top of that div, make a centered div which shows the details of the card.
* Within the card modal, we want to show to-do items