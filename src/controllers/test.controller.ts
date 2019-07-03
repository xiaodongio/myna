import express from "express";
import { BaseController } from "./base.controller";

export default class TestController extends BaseController {

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
      res.render("index.html", {
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
    this.router.get("/testPage", this.testPage.bind(this));
  }
}