import * as express from "express";

import TestController from "./test.controller";
import UserController from "./user.controller";

export default class Router {
    public static initializeRoutes(app: express.Express) {
        app.use("/", new TestController().router);
        app.use("/users", new UserController().router);
    }
}
