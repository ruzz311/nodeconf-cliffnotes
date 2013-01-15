define([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone",

  // Modules
  "modules/helpers",
  
  // Plugins
],

function( namespace, $, Backbone, Helpers ){
  
  var System = namespace.module(),
      app = namespace.app,
      common_init = function( options ){
        this.model.on( "change", function( ){ this.render() }, this );
      },
      common_serialize = function(){ 
        return { board: this.model.toJSON() } 
      },
      common_render = function( manage ){
        return manage( this ).render();
      };
  
  System.Viewport = function( ){
    var e = window, 
        a = 'inner';
    if ( !( 'innerWidth' in window ) ){
      a = 'client';
      e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
  }
  
  System.Views.Header = Backbone.View.extend({
    template: 'system/header',
    initialize: common_init,
    serialize: common_serialize
  });
  
  System.Views.Modal = Backbone.LayoutManager.extend({
    template: 'modal',
    id: 'myModal',
    className: 'modal fade',
    initialize: function(){
      var self = this;
      jQuery( self ).on('hidden', function () {
        self.remove()
      });
    },
    serialize: function(){ return this.model.toJSON() }
  });
  
  System.Views.Nav = Backbone.View.extend({
    template: 'system/nav',
    className: 'well sidebar-nav',
    initialize: common_init,
    serialize: common_serialize,
    events: { "click a": "click_handler" },
    click_handler: function(e){
      e.preventDefault();
      //@TODO: this is wrong, fix it - needs sub-views
      var id = e.target.dataset.listid
      jQuery( '.active', this.$el ).removeClass();
      jQuery( e.target, this.$el ).parent().addClass( 'active' )
      app.router.navigate( 'list/'+id, { trigger: true })
    }
  });

  // This will fetch the template and render it.
  System.Views.Error = Backbone.View.extend({
    template: 'system/error',
    initialize: common_init,
    serialize: common_serialize
  });

  return System;
});
