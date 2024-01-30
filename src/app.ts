import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import ejs from "ejs";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash";
import authRoute from "./routes/auth.route";
import viewRoute from "./routes/view.route";
import { transport } from "./configs/mail";

declare module "express-session" {
  interface SessionData {
    user: {
      secret: string;
    };
  }
}

const app = express();

app.engine(".html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

transport.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
    console.log(success);
  }
});

app.use("/auth", authRoute);
app.use("/", viewRoute);

export default app;
