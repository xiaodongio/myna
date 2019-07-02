import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy(
  {
    usernameField: "loginName",
    passwordField: "password"
  },
  (loginName, password, cb) => {
    User.findOne({loginName: loginName}, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(undefined, false); }
      if (user.password != password) { return cb(undefined, false); }
      return cb(undefined, user);
    });
  }
));

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({msg: "please login"});
};


module.exports = passport;



