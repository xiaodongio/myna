import errorHandler from "errorhandler";
import app from "./app";

app.use(errorHandler());


app.listen(3000, () => {
    console.log("the server is running at 3000");
});