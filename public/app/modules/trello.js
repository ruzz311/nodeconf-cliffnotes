define([
  "namespace",

  // Libs
  "use!jquery",
  "use!underscore",
  "use!backbone",

  // Modules
  "modules/system",
  "modules/helpers"

  // Plugins
],

function( namespace, $, _, Backbone, System, Helpers ){

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
    id: "trelloList",
    className: "list",
    events: {
      "click .notes img": 'populate_modal'
    },
    
    initialize: function( options ){
      this.model.on( "change", function( ){
        this.render();
      }, this );
    },
    
    serialize: function(){
      var cards = this.model.get_list( this.options.idList )
      return { cards: cards };
    },
    
    populate_modal: function( e ){
      var vp = System.Viewport()
      var vph = { "maxHeight":  (vp.height - (vp.height * 0.25 ))+'px' };
      var data = new Backbone.Model({
        title: e.target.alt || '',
        body: e.target.outerHTML
      });
      var modal = new System.Views.Modal({ model: data });
      
      modal.render(function( el ){
        var $el = jQuery( el )
          .addClass( 'media' )
          .find( '.modal-body' )
            .css( vph )
          .end()
            
        if( jQuery( this.id ).length )
          jQuery( this.id ).replaceWith( el )
        else
          jQuery( 'body' ).append( el )
        $el.modal({ backdrop:'static' })
      });
    }
    
  });

  // Required, return the module for AMD compliance
  return Trello;

});
