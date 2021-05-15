const { createElement } = React;
const html = htm.bind(createElement);

function HeaderPreviousRulings(props) {
  const { onChangeItemsTemplate, itemsTemplate } = props;

  return html`
    <header className="rulings__header">
      <h2>Previous Rulings</h2>
      <select
        value=${itemsTemplate}
        className="rulings__select-template"
        onChange=${onChangeItemsTemplate}
      >
        <option value="list">List</option>
        <option value="grid">Grid</option>
      </select>
    </header>
  `;
}

export default HeaderPreviousRulings;
