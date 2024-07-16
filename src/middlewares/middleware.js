exports.middleware = (req, res, next) => {
  res.locals.anVariable = "variable value";

  next();
};

exports.checkCsurfError = (error, req, res, next) => {
  if (error) {
    return res.render("404");
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
