define([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone",
  "use!handlebars",

  // Modules

  // Plugins
],

function( namespace, $, Backbone, Handlebars ){
  
  var Helpers = namespace.module(),
      app = namespace.app;
  
  String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
      return url.link(url);
    });
  };
  String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
      var username = u.replace("@","")
      return u.link("http://twitter.com/"+username);
    });
  };
  String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
      var tag = t.replace("#","%23")
      return t.link("http://search.twitter.com/search?q="+tag);
    });
  };

  Handlebars.registerHelper("decodeString", function( str ){
    return new Handlebars.SafeString( str );
  });

  Handlebars.registerHelper( "fancyPost", function( str ){
    return new Handlebars.SafeString( str.parseURL().parseUsername().parseHashtag() );
  });
  
  Handlebars.registerHelper("htmlify", function( str ){
    var result = "";
    if( str != null )
      result = str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r/g, "").replace(/\n/g, "<br />");
    return new Handlebars.SafeString( result.parseURL().parseUsername() );
  });
  
  Handlebars.registerHelper("formatDate", function( d ){
    var result = '<em>Date Missing</em>'
    
    if( d != null ){
      var day = new Date( d );

      //format time
      var baseTime = '';
      var hour = day.getHours();
      var meridiem = (hour < 12)? 'am' : 'pm';
      var minutes = (day.getMinutes() < 10)? '0' + day.getMinutes() : day.getMinutes();
      hour = (hour < 13)? hour : hour - 12;
      baseTime = hour + ':' + minutes + ' ' + meridiem;

       //format date
      var baseDate = (day.getMonth()+1)+'/'+day.getDate()+'/'+day.getFullYear();
          //baseDate+' at '+baseTime;
      return baseTime;
    }
    return new Handlebars.SafeString( result );
  });

  Handlebars.registerHelper( "debug", function( optionalValue ){
    console.log( "Current Context\n====================\n", this );
    if( optionalValue )
      console.log( "Value\n====================\n", optionalValue );
  });

  return Helpers;
});
