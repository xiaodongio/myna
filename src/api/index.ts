import * as express from "express";

import TestApi from "./test.api";

export default class Api {
    public static initializeApis(app: express.Express) {
        app.use("/api/v1", new TestApi().router);
    }
}
