import rulingsData from "../../assets/data.js";

const { useState, useCallback, useEffect } = React;

function usePreviousRulings() {
  const [itemsTemplate, setItemsTemplate] = useState(
    localStorage.getItem("cards_template") || "list"
  );
  const [dataSource, setDataSource] = useState(rulingsData.data);
  const [voting, setVoting] = useState(null);

  const onChangeItemsTemplate = useCallback(({ target: { value } }) => {
    localStorage.setItem("cards_template", value);
    setItemsTemplate(value);
  }, []);

  const updateDataSource = useCallback((newVoting) => {
    setVoting(newVoting);

    const newDataSource = dataSource.reduce((acc, cur, index) => {
      const voteSaved = newVoting[`${index}`];
      if (!voteSaved) {
        acc.push(cur);
        return acc;
      }

      const {
        votes: { positive, negative },
      } = cur;

      const newVotes = {
        positive: voteSaved > 0 ? positive + 1 : positive,
        negative: voteSaved < 0 ? negative + 1 : negative,
      };

      acc.push({
        ...cur,
        votes: newVotes,
        hasVoted: true,
        likeValue: voteSaved,
      });

      return acc;
    }, []);

    setDataSource(newDataSource);
  }, []);

  const onChangeVote = useCallback(
    (index, likeValue) => {
      let newVoting = { ...voting, [`${index}`]: likeValue };
      localStorage.setItem("voting", JSON.stringify(newVoting));
      updateDataSource(newVoting);
    },
    [voting]
  );

  useEffect(() => {
    const currentVotingStr = localStorage.getItem("voting") || "{}";
    const newVoting = JSON.parse(currentVotingStr);
    updateDataSource(newVoting);
  }, []);

  return { onChangeItemsTemplate, itemsTemplate, dataSource, onChangeVote };
}

export default usePreviousRulings;
