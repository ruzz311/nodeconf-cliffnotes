express = require "express"
app = module.exports = express.createServer()

#get info about a board
app.get "/trello/board/:id", (req, res) ->
  req.services.trello.board req.params.id, ( err, data )->
    if err instanceof Error then req.send {}
    else
      res.send data