define([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, $, Backbone) {

  // Create a new module
  var Trello = namespace.module();
  var base_url = "/trello";
  
  Trello.Board = Backbone.Model.extend({
    url: function(){
      return base_url+'/board/'+this.get('id')
    }
  });

  // This will fetch the tutorial template and render it.
  Trello.Views.Index = Backbone.View.extend({
    template: "trello",
    
    initialize: function( options ){
      var self = this;
      console.log( this, options )
      this.model.on( "change", function() {
        this.render();
      }, this );
    },
    serialize: function() {
      return { board:this.model.toJSON() };
    }
  });

  // Required, return the module for AMD compliance
  return Trello;

});
