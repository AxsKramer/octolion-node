const express = require('express');
const path = require('path');
const config = require('./config');
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");

const app = express();

const { logErrors, clientErrorHandler, errorHandler } = require("./utils/middleware/errorHandler");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, "public")));

//View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

//Redirect
app.use("/", (req, res) => res.redirect("products"));

// Error handlers
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//Server
app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));

