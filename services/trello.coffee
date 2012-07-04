express = require "express"
app = module.exports = express.createServer()
rest = require "restler"
_ = require( "underscore" )._
config = require "../config/trello"

class Trello
   
  constructor: ( )->
    # do some junk
    @base_url = "https://api.trello.com/1/"
 
  authorize: ( res )->
    res.redirect @base_url+"connect?key="+config.key+"&name="+config.appname+"&response_type=token"
  
  get: ( url, callback )->
    rest.get @base_url+method, ( result )->
      if ( err ) then throw err;
      callback( data )
  
  board: ( id, callback )->
    console.log id:id, base_url:@base_url
    url = @base_url+"board/"+id+"?actions=commentCard&cards=open&lists=open&fields=name,desc&key=#{config.key}"
    
    rest.get( url )
    .on 'complete', ( result )->
      console.log url, result, '\n=============================\n'
      if result instanceof Error then callback( result )
      else callback( null, result )

trello = new Trello()
app.use ( req, res, next )->
  req.services or= {}
  req.services.trello = trello
  next();