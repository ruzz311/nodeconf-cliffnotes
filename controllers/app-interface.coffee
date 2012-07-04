express = require "express"
app = module.exports = express.createServer()
nodeconf_trello_id = "4fefd4a85ded96a71c1e617f"

app.get "/", (req, res) -> 
  res.render "info/about"
