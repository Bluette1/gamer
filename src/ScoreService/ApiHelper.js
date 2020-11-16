const ApiHelper = (() => {
  const sortApiScores = (scoresArr) => {
    scoresArr.sort((a, b) => b.score - a.score);
    return scoresArr;
  };

  const trim = (scores) => {
    const finalScores = [];
    const users = [];
    scores.forEach(entry => {
      if ((entry.score >= 0) && (entry.user.length > 0)) {
        if (!users.includes(entry.user)) {
          users.push(entry.user);
          finalScores.push(entry);
        }
      }
    });
    return finalScores;
  };

  const topScores = (count, scores) => {
    const orderedScores = sortApiScores(trim(sortApiScores(scores)));

    if (orderedScores.length > count) {
      return orderedScores.slice(0, count);
    }
    return orderedScores;
  };

  return { topScores };
})();

export default ApiHelper;