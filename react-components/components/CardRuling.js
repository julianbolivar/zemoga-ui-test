const { createElement } = React;
const html = htm.bind(createElement);

function CardRuling({ item, itemsTemplate }) {
  const { name, description, category } = item;
  console.log(item);

  return html`
    <div className=${`rulings__card ${itemsTemplate}`}>
      <div className="rulings__card-info-container">
        <span className="rulings__card-name">${name}</span>
        <span className="rulings__card-description">${description}</span>
        <span className="rulings__card-extra">${category}</span>
      </div>
      <div className="rulings__card-votes-container"></div>
    </div>
  `;
}

export default CardRuling;
