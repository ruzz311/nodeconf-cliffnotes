define([
  "namespace",

  // Libs
  "use!jquery",
  "use!underscore",
  "use!backbone"

  // Modules

  // Plugins
],

function( namespace, $, _, Backbone ){

  // Create a new module
  var Trello = namespace.module();
  var base_url = "/trello";
  
  
  //====================================================== DATA STRUCTURES
  
  Trello.Board = Backbone.Model.extend({
    url: function(){
      return base_url+'/board/'+this.get('id')
    },
    get_list : function( idList ){
      var all_cards = this.get( 'cards' );
      var all_actions = this.get( 'actions' );
      // only get cards that matter
      var cards = _.filter( all_cards, function( item ){
        return item.idList == idList
      });
      // embed actions in the associated card
      _.each( cards, function( card, i, list ){
          card.actions = _.filter( all_actions, function( action ){
            return action.data.card.id == card.id
          });
      });
      return cards;
    }
  });


  //================================================================ VIEWS
  
  Trello.Views.Index = Backbone.View.extend({
    template: "home",
    
    initialize: function( options ){
      this.model.on( "change", function( ){
        this.render();
      }, this );
    },
    
    serialize: function(){
      return { board:this.model.toJSON() };
    }
    
  });
  
  Trello.Views.List = Backbone.View.extend({
    template: "list",
    className: "row-fluid",
    
    initialize: function( options ){
      this.model.on( "change", function( ){
        this.render();
      }, this );
    },
    
    serialize: function(){
      var cards = this.model.get_list( this.options.idList )
      return { cards: cards };
    }
    
  });

  // Required, return the module for AMD compliance
  return Trello;

});
