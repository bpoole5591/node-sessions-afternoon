const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();

// middleware
const checkForSession = require(`${__dirname}/middlewares/checkForSession.js`);

// controllers
const swag_controller = require(`${__dirname}/controllers/swag_controller.js`);
const auth_controller = require(`${__dirname}/controllers/auth_controller.js`);
const cart_controller = require(`${__dirname}/controllers/cart_controller.js`);
const search_controller = require(`${__dirname}/controllers/search_controller.js`);

const app = express();

app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

// check for active session
app.use(checkForSession);

app.use(express.static(`${__dirname}/build`));

// show swag
app.get("/api/swag", swag_controller.read);

// user authentication
app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

// cart controls
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

// search
app.get("/api/search", search_controller.search);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Ahoy, matey! Port ${port} dead ahead!`);
});
