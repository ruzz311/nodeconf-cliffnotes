define([
  "namespace",

  // Libs
  "use!jquery",
  "use!backbone",
  "use!handlebars",

  // Modules

  // Plugins
  "use!plugins/markdown.converter"
],

function( namespace, $, Backbone, Handlebars, Markdown ){
  
  var Helpers = namespace.module(),
      app = namespace.app,
      converter = new Markdown.Converter();
  
  Handlebars.registerHelper("decodeString", function( str ){
    return new Handlebars.SafeString( str );
  });
  
  Handlebars.registerHelper( "if_eq", function( x, y ){
    return x === y
  });
  
  Handlebars.registerHelper( "trelloAction", function( obj ){
    var result = '';
    switch( obj.type ){
      case "addAttachmentToCard":
        result = '<img src="'+obj.data.attachment.url+'" alt="'+obj.data.attachment.name+'" />';
        break;
      case "commentCard":
        result = converter.makeHtml( obj.data.text );
        break;
      default: break;
    }
    return new Handlebars.SafeString( result );
  });
  
  Handlebars.registerHelper( "classFromLabels", function( labels ){
    return _.pluck( labels, 'name' ).join(' ')
  });
  
  Handlebars.registerHelper( "markdown", function( str ){
    if( str === "" || typeof str == "undefined" || str === null )
      return '';
    return new Handlebars.SafeString( converter.makeHtml( str ) );
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
