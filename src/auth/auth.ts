import passport from "passport";
import { Strategy as LocalStrategy }  from "passport-local";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";


export class Auth {
  static serializeUser() {
    passport.serializeUser<any, any>((user, done) => {
      done(undefined, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });
  }

  /**
   * LocalStrategy
   *
   * This strategy is used to authenticate users based on a username and password.
   * Anytime a request is made to authorize an application, we must ensure that
   * a user is logged in before asking them to approve the request.
   */
  static useLocalStrategy() {
    passport.use(new LocalStrategy({
      usernameField: "loginName",
      passwordField: "password"
    }, async(loginName, password, cb) => {
      const user = await User.findOne({loginName: loginName});
      if (user) {
        const authorized = await this.comparePasswords(password, user.password);
        if (authorized) {
            return cb(undefined, user);
        } else {
            return cb(undefined, false);
        }
      } else {
          return cb(undefined, false);
      }

    }));
  }

  static async comparePasswords(pass1: string | undefined, pass2: string | undefined): Promise<boolean> {
    if (pass1 && pass2) {
        return bcrypt.compare(pass1, pass2);
    } else {
        return false;
    }
  }

  static isAuthenticated (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send({msg: "please login"});
  }

}
