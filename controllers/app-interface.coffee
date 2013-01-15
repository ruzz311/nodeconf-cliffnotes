express = require "express"
app = module.exports = express.createServer()
nodeconf_trello_id = "4fefd4a85ded96a71c1e617f"

single_page_app = (req, res) -> 
  res.render "app", layout:false

app.get "/", single_page_app
app.get "/list/*splat", single_page_app

  
# All Planned routes have been checked - something got borked if we reach these routes
app.all "*", (req, res) -> 
  res.render "404",  layout:false
