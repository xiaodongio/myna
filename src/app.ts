import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import mongo from "connect-mongo";
import passport from "passport";
import lusca from "lusca";
import { MONGODB_URI, SESSION_SECRET } from "./utils/env";
import mongoose from "mongoose";
import dotenv from "dotenv";

// api
import api from "./api";


const MongoStore = mongo(session);

const app = express();

// Load environment variables from .env file
dotenv.config({ path: ".env.dev" });

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


app.use(bodyParser.json());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    url: MONGODB_URI,
    autoReconnect: true
  })
}));


app.use(passport.initialize());
app.use(passport.session());


app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


api(app);

// app.use("/", (req, res) => {
//   res.send({ msg: "hello" });
// });

export default app;