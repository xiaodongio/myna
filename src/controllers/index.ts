import * as express from "express";

import HomeController from "./home.controller";
import UserController from "./user.controller";

export default class Router {
    public static initializeRoutes(app: express.Express) {
        app.use("/", new HomeController().router);
        app.use("/users", new UserController().router);
    }
}
