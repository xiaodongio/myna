import express from "express";
import { BaseController } from "./base.controller";
import { Auth } from "../auth/auth";

export default class HomeController extends BaseController {

  constructor() {
      super();
  }

  public async test(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      res.json({
        msg: "test controllers success!"
      });
    } catch (error) {
        next(error);
    }
  }

  public async testPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      res.render("home.html", {
        user: {
          name: "myna",
          tags: ["nodejs", "typescript", "socket.io"]
        }
      });
    } catch (error) {
      next(error);
    }
  }

  buildRoutes() {
    this.router.get("/test", this.test.bind(this));
    this.router.get("/home", Auth.isAuthenticated, this.testPage.bind(this));
  }
}