const boom = require('@hapi/boom');
const config = require('../../config');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

function withErrorStack(error, stack){
  if(config.dev){
    return {...error, stack}
  }
}

//imprime los errores
function logErrors(error, req, res, next){
  console.log(error.stack);
  next(error);
}

function wrapErrors(error, req, res, next){
  if(!error.isBoom){
    next(boom.badImplementation(error));
  }
  next(error);
}

function clientErrorHandler(error, req, res, next){
  const {output: {statusCode, payload}} = error;
  //catch errors from AJAX request
  //Para la validación en Postman 
  //Activar en Headers
  //Key: X-Requested-With
  //Value: XMLHttpRequest
  // req.xhr 
  //catch errors from AJAX request or if an error ocurrs while streaming
  isRequestAjaxOrApi(req) || res.headersSent
    ? res.status(statusCode).json(withErrorStack(payload, error.stack)) 
    : next(error);
}

//Manejador de errores
function errorHandler(error, req, res, next) {
  const {output: {statusCode, payload}} = error;
  res.status(statusCode);
  res.render("error", withErrorStack(payload, error.stack));
}



module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
}