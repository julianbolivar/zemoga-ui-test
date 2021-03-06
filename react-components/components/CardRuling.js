import useCardRuling from "../hooks/useCardRuling.js";

const { createElement } = React;
const html = htm.bind(createElement);

function CardRuling({ item, itemsTemplate, index, onChangeVote }) {
  const { name, description, picture } = item;
  const {
    likeValue,
    setLikeValue,
    avgVotesInfo,
    dateCategoryInfo,
    onClickVote,
    hasVoted,
  } = useCardRuling({ ...item, index, onChangeVote });

  return html`
    <div className=${`rulings__card ${itemsTemplate}`}>
      <div className="rulings__card-bg">
        <img
          src=${`assets/img/people_rulings/${picture.replace(".png", "")}.jpg`}
        />
        <div />
      </div>

      <div className="rulings__card-info-container">
        <div
          className=${`rulings__card-thumb-wrapper avg ${avgVotesInfo.classColor}`}
        >
          <img src=${avgVotesInfo.urlImage} alt="thumb icon" />
        </div>

        <span className="rulings__card-name">${name}</span>
        <span className="rulings__card-description">${description}</span>
        <span className="rulings__card-extra">${dateCategoryInfo}</span>
        <div className="rulings__card-actions">
          <div
            className=${`rulings__card-thumb-wrapper thumb-like ${
              likeValue === 1 && "selected"
            } ${hasVoted && "disabled"}`}
            onClick=${() => {
              if (hasVoted) return;
              likeValue === 1 ? setLikeValue(0) : setLikeValue(1);
            }}
          >
            <img src="assets/img/thumbs-up.svg" alt="thumb icon" />
          </div>
          <div
            className=${`rulings__card-thumb-wrapper thumb-unlike ${
              likeValue === -1 && "selected"
            } ${hasVoted && "disabled"}`}
            onClick=${() => {
              if (hasVoted) return;
              likeValue === -1 ? setLikeValue(0) : setLikeValue(-1);
            }}
          >
            <img src="assets/img/thumbs-down.svg" alt="thumb icon" />
          </div>
          <button
            className=${`rulings__card-btn-vote ${
              likeValue === 0 && "disabled"
            }`}
            disabled=${!likeValue}
            onClick=${onClickVote}
          >
            ${hasVoted ? "Vote again" : "Vote now"}
          </button>
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

export default CardRuling;
