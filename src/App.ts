import m from "mithril";
import Data from "./Data";

import MainPage from "./components/MainPage";
import TrackerPage from "./components/TrackerPage";

// Init state
const state = {};
Object.keys(Data.EXPLORERS).forEach((explorerName) => {
  const defaultStatIndexes = Data.EXPLORERS[explorerName].defaultStatIndexes;
  state[explorerName] = {
    speed: defaultStatIndexes[0],
    might: defaultStatIndexes[1],
    sanity: defaultStatIndexes[2],
    knowledge: defaultStatIndexes[3],
  };
});

// Set up routing by connecting components to routes
m.route(document.body, "/", {
  '/': { view: () => m(MainPage, { state: state }) },
  '/tracker': { view: () => m(TrackerPage, { state: state }) },
});
