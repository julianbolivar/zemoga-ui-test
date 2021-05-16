const { useState, useMemo, useCallback, useEffect } = React;

function CardRuling({
  category,
  votes,
  lastUpdated,
  index,
  onChangeVote,
  hasVoted: initHasValue = null,
  likeValue: initLikeValue = null,
}) {
  const [likeValue, setLikeValue] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const avgVotesInfo = useMemo(() => {
    const { positive, negative } = votes;
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
    if (hasVoted) return "Thank you for your vote!";

    const currentDate = dayjs();
    const rulingDate = dayjs(lastUpdated);

    const years = currentDate.diff(rulingDate, "year");
    const months = currentDate.diff(rulingDate, "months");
    const days = currentDate.diff(rulingDate, "days");

    let dateInfo = "";
    if (years >= 1) dateInfo = `${years} ${years > 1 ? "years" : "year"} ago`;
    else if (months >= 1)
      dateInfo = `${months} ${months > 1 ? "months" : "month"} ago`;
    else dateInfo = `${days} ${days > 1 ? "days" : "day"} ago`;

    const categoryCap = category.charAt(0).toUpperCase() + category.slice(1);

    return `${dateInfo} in ${categoryCap}`;
  }, [category, lastUpdated, hasVoted]);

  const onClickVote = useCallback(() => {
    const newHasVoted = !hasVoted;
    setHasVoted(newHasVoted);

    if (!newHasVoted) {
      onChangeVote(index, 0);
      setLikeValue(0);
      return;
    }
    return onChangeVote(index, likeValue);
  }, [hasVoted, likeValue, onChangeVote]);

  useEffect(() => {
    if (initHasValue === null && initLikeValue === null) return;
    setHasVoted(initHasValue);
    setLikeValue(initLikeValue);
  }, [initHasValue, initLikeValue]);

  return {
    likeValue,
    setLikeValue,
    avgVotesInfo,
    dateCategoryInfo,
    onClickVote,
    hasVoted,
  };
}

export default CardRuling;
