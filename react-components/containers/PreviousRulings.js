import rulingsData from "../../assets/data.js";

import HeaderPreviousRulings from "../components/HeaderPreviousRulings.js";
import CardRuling from "../components/CardRuling.js";

const { createElement, useState, useCallback } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

function PreviousRulings() {
  const [itemsTemplate, setItemsTemplate] = useState("grid");

  const onChangeItemsTemplate = useCallback(
    ({ target: { value } }) => setItemsTemplate(value),
    []
  );

  return html`
    <${HeaderPreviousRulings}
      key="header-previous-rulings"
      onChangeItemsTemplate=${onChangeItemsTemplate}
      itemsTemplate=${itemsTemplate}
    />
    <div key="rulings__items" className=${`rulings__items ${itemsTemplate}`}>
      ${rulingsData.data.map((rulingItem, index) => {
        const key = `ruling-card-${index}`;
        return html`<${CardRuling}
          key=${key}
          item=${rulingItem}
          itemsTemplate=${itemsTemplate}
        />`;
      })}
    </div>
  `;
}

render(
  html`<${PreviousRulings} />`,
  document.getElementById("previous_rulings")
);
