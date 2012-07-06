express = require "express"
app = module.exports = express.createServer()
rest = require "restler"
_ = require( "underscore" )._

# Config & Object Defaults
config = require "../config/trello"
defaults = _.extend
  version : config.version
  cache : require "./data-cache/trello",
  config

# Trello
class Trello
   
  constructor: ( options )->
    @settings = _.extend( {}, defaults, options || {} )
  
  # Getter / setter for the trello api version
  base_url: ( )->
    "https://api.trello.com/#{ @version() }/"
  
  # Getter / setter for the trello api version
  version: ( v )->
    if v isnt undefined then @settings.version = v
    @settings.version
    
  authorize: ( res )->
    res.redirect "#{ @base_url() }connect?key=#{ config.key }&name=#{ config.appname }&response_type=token"
  
  get: ( method, callback )->
    url = "#{ @base_url() }#{ method }&key=#{ config.key }"
    # used while coding on the plane back from nodeconf - return 'cache' when errors happen
    cache = @settings.cache 
    
    rest.get( url )
    .on 'complete', ( result )->
      if result instanceof Error
        console.log "Trello.get ERROR!", result
        callback( result )
      else callback( null, result )
  
  board: ( id, callback )->
    method = "board/#{ id }?actions=commentCard,addAttachmentToCard&cards=open&lists=open&fields=name,desc,url,labelNames,pinned"
    @get method, callback
    
# Attach Trello as middleware
trello = new Trello()
app.use ( req, res, next )->
  req.services or= {}
  req.services.trello = trello
  next();