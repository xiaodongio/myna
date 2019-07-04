import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import passport from "passport";
import lusca from "lusca";
import { MONGODB_URI, SESSION_SECRET } from "./utils/env";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import morgan from "morgan";
import http from "http";
import logger from "./utils/logger";
import * as path from "path";

// controllers
import Router from "./controllers";

import { Auth } from "./auth/auth";


export default class App {

  public static app: express.Express;

  constructor() {}

  public static async initializeApp(): Promise<http.Server> {
    try {
      // Load environment variables from .env file
      dotenv.config({ path: ".env.dev" });

      App.app = express();

      // mongodb
      App.initializeMongoDB();

      // Configure application
      App.configureApp();

      // Initialize passport
      App.initializeAuth();

      // Initialize routes
      Router.initializeRoutes(App.app);


      process.on("unhandledRejection", (reason, p) => {
          logger.error("Unhandled Rejection at: Promise", p, "reason:", reason);
      });

      return App.app.listen(App.app.get("port"));
    } catch (error) {
        throw new Error(error.message);
    }

  }

  private static initializeMongoDB() {
    // Connect to MongoDB
    mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }

  private static initializeAuth() {
    App.app.use(passport.initialize());
    App.app.use(passport.session());
    Auth.serializeUser();
    Auth.useLocalStrategy();
  }


  private static configureApp() {
    // art template
    App.app.set("views", path.join(__dirname, "../src/views"));

    App.app.engine("html", require("express-art-template"));
    App.app.set("view options", {
      debug: process.env.NODE_ENV !== "production",
      extname: ".html"
    });


    App.app.use(
        express.static(path.join(__dirname, "../src/public"), { maxAge: 31557600000 })
    );

      // all environments
    App.app.set("port", process.env.PORT || 3000);
    App.app.use(bodyParser.urlencoded({ extended: true }));
    App.app.use(bodyParser.json());
    App.app.use(compression());
    App.app.use(morgan("dev", {
        skip: function (req, res) {
            return res.statusCode < 400;
        }, stream: process.stderr
    }));

    App.app.use(morgan("dev", {
        skip: function (req, res) {
            return res.statusCode >= 400;
        }, stream: process.stdout
    }));

    const MongoStore = mongo(session);
    App.app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: SESSION_SECRET,
      store: new MongoStore({
        url: MONGODB_URI,
        autoReconnect: true
      })
    }));

    App.app.use(lusca.xframe("SAMEORIGIN"));
    App.app.use(lusca.xssProtection(true));


  }
}