express = require "express"
config = require "../config/app"
port = process.env['app_port'] || 1337
if process.env.PORT then port = process.env.PORT
app = express.createServer()

# Settings
app.set "view engine", "jade"
app.set "view options", pretty: true

app.configure "development", () ->
  app.use express.logger "dev"
  app.use express.errorHandler { dumpExceptions: true, showStack: true }

app.configure "production", () ->
  app.set "view options", pretty: false
  app.use express.errorHandler()

# Middleware
app.use express.static __dirname + "/../public"
app.use require "../services/trello"

# Controllers
app.use require "./data-interface"
app.use require "./app-interface"

# Listen
app.listen port
console.log "Express application booted, listening on #{port}."