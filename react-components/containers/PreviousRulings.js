import HeaderPreviousRulings from "../components/HeaderPreviousRulings.js";
import CardRuling from "../components/CardRuling.js";
import usePreviousRulings from "../hooks/usePreviousRulings.js";

const { createElement } = React;
const render = ReactDOM.render;
const html = htm.bind(createElement);

function PreviousRulings() {
  const { onChangeItemsTemplate, itemsTemplate, dataSource, onChangeVote } =
    usePreviousRulings();

  return html`
    <${HeaderPreviousRulings}
      key="header-previous-rulings"
      onChangeItemsTemplate=${onChangeItemsTemplate}
      itemsTemplate=${itemsTemplate}
    />
    <div key="rulings__items" className=${`rulings__items ${itemsTemplate}`}>
      ${dataSource.map((rulingItem, index) => {
        const key = `ruling-card-${index}`;
        return html`<${CardRuling}
          key=${key}
          item=${rulingItem}
          itemsTemplate=${itemsTemplate}
          index=${index}
          onChangeVote=${onChangeVote}
        />`;
      })}
    </div>
  `;
}

render(
  html`<${PreviousRulings} />`,
  document.getElementById("previous_rulings")
);
