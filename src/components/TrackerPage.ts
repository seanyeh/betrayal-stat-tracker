import m from "mithril";

import images from "../img/explorers/*.png";
import Data from "../Data";

export default class TrackerPage {
  constructor() {
    this.explorerName = m.route.param("name");
    this.explorer = Data.EXPLORERS[this.explorerName];

    this.statTrackers = ["speed", "might", "sanity", "knowledge"].map((statName) => (
      new StatTracker(this.explorer, statName)
    ));
  }

  view() {
    const name = this.explorerName.replaceAll("_", " ");

    return [
      m("div.center", [
        m("img", { src: images[this.explorerName], width: 150 }),
      ]),
      m("h1", name),
      m("div.stats", [
        this.statTrackers.map((trackerComponent) => m(trackerComponent))
      ]),
    ];
  }
}

enum StatType {
  speed = 0,
  might = 1,
  sanity = 2,
  knowledge = 3,
}

class StatTracker {
  constructor(explorer, statName) {
    this.statName = statName;

    const statType = StatType[statName];
    this.stats = explorer.stats[statType];
    this.startIndex = explorer.defaultStatIndexes[statType];
    this.currentIndex = this.startIndex;
  }

  reset() {
    this.currentIndex = startIndex;
  }

  increment() {
    if (this.currentIndex <= this.stats.length - 2) {
      this.currentIndex++;
    }
  }

  decrement() {
    if (this.currentIndex >= 1) {
      this.currentIndex--;
    }
  }

  view() {
    // Column is displayed in reverse (bottom to top)
    return m("div.column", [
      m("div.button", { onclick: () => this.decrement() }, "-"),
      this.stats.map((value, index) => {
        let cssClasses = [];
        if (index === this.startIndex) { cssClasses.push("default") }
        if (index === this.currentIndex) { cssClasses.push("selected") }
        if (index === 0) { cssClasses.push("red") }

        return m("div", { class: cssClasses.join(" ") }, value);
      }),
      m("div.button", { onclick: () => this.increment() }, "+"),
      m("h2", this.statName),
    ]);
  }
}
