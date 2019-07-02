import express from "express";

const router = express.Router();


router.get("/test", (req: express.Request, res: express.Response) => {
   res.json({
       msg: "test api success!"
   });
});


export default router;