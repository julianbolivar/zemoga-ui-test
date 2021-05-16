const { createElement, useMemo } = React;
const html = htm.bind(createElement);

function CardRuling({ item, itemsTemplate }) {
  const { name, description, category, votes, picture, lastUpdated } = item;
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

  const dateCategoryInfo = useMemo(() => {
    const currentDate = dayjs();
    const rulingDate = dayjs(lastUpdated);

    const years = currentDate.diff(rulingDate, "year");
    const months = currentDate.diff(rulingDate, "months");
    const days = currentDate.diff(rulingDate, "days");

    let dateInfo = "";
    if (years > 1) dateInfo = `${years} ${years > 1 ? "years" : "year"} ago`;
    else if (months > 1)
      dateInfo = `${months} ${months > 1 ? "months" : "month"} ago`;
    else dateInfo = `${days} ${days > 1 ? "days" : "day"} ago`;

    const categoryCap = category.charAt(0).toUpperCase() + category.slice(1);

    return `${dateInfo} in ${categoryCap}`;
  }, [category, lastUpdated]);

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

export default CardRuling;
