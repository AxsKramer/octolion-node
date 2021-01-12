const boom = require('@hapi/boom');
const config = require('../../config');

//imprime los errores
function logErrors(error, req, res, next){
  console.log(error);
  next(error);
}

function clientErrorHandler(error, req, res, next){
  //catch errors from AJAX request
  req.xhr 
    ? res.status(500).json({error: error.message}) 
    : next(error);
}

//Manejador de errores
function errorHandler(error, req, res, next) {
  //catch errors while streaming
  if(res.headerSent){
    next(error);
  }

  if(!config.dev){
    delete error.stack;
  }

  res.status(error.status || 500);
  res.render("error", {error: error});
}



module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
}