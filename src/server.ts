import App from "./app";
import SocketServer from "./socket/SocketServer";

App.initializeApp().then((server) => {
    new SocketServer(server);
    console.log(("  App is running at %d in %s mode"), App.app.get("port"), App.app.get("env"));
});

