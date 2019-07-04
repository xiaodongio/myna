import { Request, Response, NextFunction } from "express";
import { UserDocument, User } from "../models/User";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { check, validationResult  } from "express-validator";
import { BaseController } from "./base.controller";


export default class UserController extends BaseController {

  constructor() {
    super();
  }

  private async login(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    passport.authenticate("local", (err: Error, user: UserDocument, info: IVerifyOptions) => {
      if (err) { return next(err); }
      if (!user) {
        return res.status(401).json({ errors: info.message });
      }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.redirect(req.session.returnTo || "/");
      });
    })(req, res, next);
  }

  private async registerPage(req: Request, res: Response) {
    res.render("register.html");
  }

  private async register(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.create(req.body);
    return res.send({user});
  }

  private async loginPage(req: Request, res: Response) {
    res.render("login.html");
  }


  buildRoutes(): void {
    this.router.post("/login", [
      check("loginName").not().isEmpty().withMessage("loginName cannot be blank"),
      check("password").not().isEmpty().withMessage("Password cannot be blank")
    ], this.login.bind(this));

    this.router.get("/login", this.loginPage.bind(this));
    this.router.get("/register", this.registerPage.bind(this));
    this.router.post("/register", [
      check("loginName").not().isEmpty().withMessage("loginName cannot be blank"),
      check("password").not().isEmpty().withMessage("Password cannot be blank")
    ], this.register.bind(this));
  }
}