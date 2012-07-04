require([
  "namespace",

  // Libs
  "jquery",
  "use!backbone",

  // Modules
  "modules/trello",
  "modules/System"
],

function( namespace, $, Backbone, Trello, System ){
  
  // Shorthand the application namespace
  var app = namespace.app,
      board = new Trello.Board({ id: "4fefd4a85ded96a71c1e617f" }),
      layout_main = new Backbone.LayoutManager({
        template: "main"
      });
  
  window.test = board
  
  var Router = Backbone.Router.extend({
    routes: {
      ""          : "index",
      "about"     : "about",
      "list/:id"  : "show_list",
      "error/:id" : "error",
    },
    
    initialize: function( options ){
      layout_main.setViews({
        "#nav_site .container-fluid" : new System.Views.Header({ model: board }),
        "#nav_pages"  : new System.Views.Nav({ model: board })
      });
      layout_main.render(function( el ){ $("#main").html( el ) }); 
          
      board.fetch({
        "success":function( d ){},
        "error":function( d ){ app.router.navigate( '/error/500', { trigger: true, replace: true }); }
      });
    },

    index: function() {
      var self = this;
      layout_main.setViews({
        "#contents": new Trello.Views.Index({ model: board }) 
      })
    },
    
    about: function(){
      console.log( 'CONTACT ROUTE' )
    },
    
    show_list: function( id ){
      var list_view = new Trello.Views.List({ idList:id, model: board });
      layout_main.setViews({ "#contents": list_view });
      //@TODO:  I shouldn't have to do this...
      layout_main.render(function( el ){ $("#main").html( el ) }); 
    },
    
    error: function( error ){
      layout_main.setViews({ 
        "#contents": new System.Views.Error({ error_code:error })
      });
    }
  });

  $(function() {
    app.router = new Router();
    Backbone.history.start({ pushState: false });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // This uses the default router defined above, and not any routers
      // that may be placed in modules.  To have this work globally (at the
      // cost of losing all route events) you can change the following line
      // to: Backbone.history.navigate(href, true);
      app.router.navigate(href, true);
    }
  });

});
