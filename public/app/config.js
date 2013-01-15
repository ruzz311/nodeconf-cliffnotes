// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: ["main"],

  paths: {
    // JavaScript folders
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",

    // Libraries
    jquery: "../assets/js/libs/jquery",
    underscore: "../assets/js/libs/underscore",
    backbone: "../assets/js/libs/backbone",
    handlebars: "../assets/js/libs/handlebars-1.0.0.beta.6",
    bootstrap: "../assets/js/libs/bootstrap.min",

    // Shim Plugin
    use: "../assets/js/plugins/use"
  },

  use: {
    backbone: {
      deps: ["use!underscore", "jquery"],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    },

    handlebars: {
      attach: "Handlebars"
    },
    
    bootstrap: {
      deps: ["use!jquery"],
      attach: "bootstrap"
    },
    "plugins/markdown.converter": {
      deps: ["use!backbone"],
      attach: "Markdown"
    },
    "plugins/backbone.layoutmanager": {
      deps: ["use!backbone"]
    }
  }
});
