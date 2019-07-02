import express from "express";
import { BaseApi } from "./base.api";

export default class TestApi extends BaseApi {

  constructor() {
      super();
  }

  public async test(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      res.json({
        msg: "test api success!"
      });
    } catch (error) {
        next(error);
    }
  }

  buildApis() {
    this.router.get("/test", this.test.bind(this));
  }
}