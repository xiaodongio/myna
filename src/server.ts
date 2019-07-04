import App from "./app";

App.initializeApp().then((app) => {
    console.log(("  App is running at %d in %s mode"), App.app.get("port"), App.app.get("env"));
});