import m from "mithril";

import images from "../img/explorers/*.png";
import Data from "../Data";

export default class TrackerPage {
  constructor({ attrs: { state } }) {
    this.explorerName = m.route.param("name");

    const explorer = Data.EXPLORERS[this.explorerName];
    explorer.name = this.explorerName;

    this.statTrackers = ["speed", "might", "sanity", "knowledge"].map((statName) => (
      new StatTracker(explorer, statName, state)
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
  constructor(explorer, statName, state) {
    this.statName = statName;
    this.explorerName = explorer.name;

    const statType = StatType[statName];
    this.stats = explorer.stats[statType];
    this.startIndex = explorer.defaultStatIndexes[statType];

    this.state = state;
  }

  get currentIndex() {
    return this.state[this.explorerName][this.statName];
  }

  increment() {
    if (this.currentIndex <= this.stats.length - 2) {
      this.state[this.explorerName][this.statName]++;
    }
  }

  decrement() {
    if (this.currentIndex >= 1) {
      this.state[this.explorerName][this.statName]--;
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
