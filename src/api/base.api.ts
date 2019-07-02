import * as express from "express";

export abstract class BaseApi {

    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.buildApis();
    }

    protected abstract buildApis(): void;

}