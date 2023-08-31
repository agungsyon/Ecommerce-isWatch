const express = require('express');
const app = express()
const router = require('./routes');
const session = require('express-session')
const port = 3000

const qrcode = require("qrcode")

const path = require("path")

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
  secret: 'cuma aku yang tau',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true //for secure from csrf attack
  }
}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
