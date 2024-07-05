exports.middleware = (req, res, next) => {
  res.locals.anVariable = "variable value";

  next();
};

exports.checkCsurfError = (error, req, res, next) => {
  if (error && "EBADCSRFTOKEN" === error.code) {
    return res.render("404");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
