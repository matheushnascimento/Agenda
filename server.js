//#region requires
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");

const path = require("node:path");

const routes = require("./routes");
const {
  middleware,
  checkCsurfError,
  csrfMiddleware,
} = require("./src/middlewares/middleware");
const port = 3000;
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connection established");
    app.emit("ready");
  })
  .catch(e => console.log(e));

const sessionOptions = session({
  secret: "secret",
  store: new MongoStore({
    mongoUrl: `${process.env.CONNECTION_STRING}`,
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  httpsOnly: true,
});

const app = express();
//#endregion

//#region app.use()

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(helmet());
app.use(sessionOptions);
app.use(flash());
app.use(csrf());
app.use(middleware);
app.use(checkCsurfError);
app.use(csrfMiddleware);
app.use(routes);

//#endregion

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");
app.on("ready", () => {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
