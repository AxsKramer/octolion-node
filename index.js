const express = require('express');
const path = require('path');
const config = require('./config');
const productsRouter = require("./routes/views/products");
const productsApiRouter = require("./routes/api/products");
const authApiRouter = require('./routes/api/auth');
const { logErrors, clientErrorHandler, wrapErrors, errorHandler } = require("./utils/middleware/errorHandler");
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
const Boom  = require('@hapi/boom');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static files
app.use(express.static(path.join(__dirname, "public")));

//View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Routes
app.use("/api/auth", authApiRouter );
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

//Redirect
app.use("/", (req, res) => res.redirect("products"));

//Page 404
app.use((req, res, next) => {
  if(isRequestAjaxOrApi(req)) {
    const {output: {statusCode, payload}} = Boom.notFound();
    res.status(statusCode).json(payload);
    next()
  }

  res.status(404).render("page404");

})

// Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//Server
app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`));

