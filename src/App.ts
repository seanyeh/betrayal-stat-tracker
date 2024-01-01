import m from "mithril";
import MainPage from "./components/MainPage";
import TrackerPage from "./components/TrackerPage";

// Set up routing by connecting components to routes
m.route(document.body, "/", {
  "/": MainPage,
  "/tracker": TrackerPage,
});
