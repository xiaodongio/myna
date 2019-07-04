import * as express from "express";

export abstract class BaseController {

    public router: express.Router;

    protected constructor() {
        this.router = express.Router();
        this.buildRoutes();
    }

    protected abstract buildRoutes(): void;

}