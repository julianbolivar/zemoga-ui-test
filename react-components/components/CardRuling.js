const { createElement, useMemo } = React;
const html = htm.bind(createElement);

function CardRuling({ item, itemsTemplate }) {
  const { name, description, category, votes } = item;
  const { positive, negative } = votes;

  const avgVotesInfo = useMemo(() => {
    const classColor = positive > negative ? "thumb-like" : "thumb-unlike";
    const urlImage =
      positive > negative
        ? "assets/img/thumbs-up.svg"
        : "assets/img/thumbs-down.svg";

    const totalVotes = positive + negative;
    const positivePercent = (positive / totalVotes) * 100;
    const negativePercent = (negative / totalVotes) * 100;

    return { classColor, urlImage, positivePercent, negativePercent };
  }, [votes]);

  return html`
    <div className=${`rulings__card ${itemsTemplate}`}>
      <div className="rulings__card-info-container">
        <div
          className=${`rulings__card-thumb-wrapper avg ${avgVotesInfo.classColor}`}
        >
          <img src=${avgVotesInfo.urlImage} alt="thumb icon" />
        </div>

        <span className="rulings__card-name">${name}</span>
        <span className="rulings__card-description">${description}</span>
        <span className="rulings__card-extra">${category}</span>
        <div className="rulings__card-actions">
          <div className="rulings__card-thumb-wrapper thumb-like">
            <img src="assets/img/thumbs-up.svg" alt="thumb icon" />
          </div>
          <div className="rulings__card-thumb-wrapper thumb-unlike">
            <img src="assets/img/thumbs-down.svg" alt="thumb icon" />
          </div>
          <button className="rulings__card-btn-vote">Vote now</button>
        </div>
      </div>
      <div className="rulings__card-votes-container">
        <div
          className="rulings__card-thumb-wrapper thumb-like"
          style=${{
            height: "100%",
            width: `${avgVotesInfo.positivePercent}%`,
          }}
        >
          <img src="assets/img/thumbs-up.svg" alt="thumb icon" />
          <p>${`${avgVotesInfo.positivePercent.toFixed(1)} %`}</p>
        </div>
        <div
          className="rulings__card-thumb-wrapper thumb-unlike"
          style=${{ height: "100%", flex: 1 }}
        >
          <p>${`${avgVotesInfo.negativePercent.toFixed(1)} %`}</p>
          <img src="assets/img/thumbs-down.svg" alt="thumb icon" />
        </div>
      </div>
    </div>
  `;
}

// style=${{ height: "100%", width: avgVotesInfo.positivePercent }}
// style=${{ height: "100%", width: avgVotesInfo.negativePercent }}

export default CardRuling;
