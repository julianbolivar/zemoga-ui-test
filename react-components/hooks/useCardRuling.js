const { useMemo } = React;

function CardRuling({ category, votes, lastUpdated }) {
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

  return { avgVotesInfo, dateCategoryInfo };
}

export default CardRuling;
