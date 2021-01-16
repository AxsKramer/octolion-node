function isRequestAjaxOrApi(request){
  return !request.accepts("html") || request.xhr;
}

module.exports = isRequestAjaxOrApi;