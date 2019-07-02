import * as express from "express";

import testApi from "./test.api";

export default function api(server: express.Express) {
    server.use("/api/v1", testApi);
}