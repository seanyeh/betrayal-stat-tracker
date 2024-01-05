import m from "mithril";

import Data from "../Data";
import images from "../img/explorers/*.png";

export default class MainPage {
  view() {
    return [
      m("h1", "Betrayal at House on the Hill Stat Tracker"),

      m("div.grid", [
        Object.keys(Data.EXPLORERS).map((explorerName) => {
          const onClick = () => {
            m.route.set("/tracker", {
              name: explorerName
            });
          };

          return m("div.explorer", { onclick: onClick }, [
            m("img", { src: images[explorerName], width: 70 }),
            m("div", explorerName.replaceAll("_", " "))
          ]);
        })
      ])
    ];
  }
}
