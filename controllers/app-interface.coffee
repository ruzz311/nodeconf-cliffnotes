express = require "express"
app = module.exports = express.createServer()
nodeconf_trello_id = "4fefd4a85ded96a71c1e617f"

app.get "/", (req, res) -> 
  res.render "app"

  
# All Planned routes have been checked - something got borked if we reach these routes
app.all "*", (req, res) -> 
  res.render "404"
