const ApiHelper = (() => {
  const sortApiScores = (scoresArr) => {
    scoresArr.sort((a, b) => b.score - a.score);
    console.log('scoresArr!!!', scoresArr)
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
    console.log('finalscores!!!', finalScores)
    return finalScores;
  };

  const topScores = (count, scores) => {
    const orderedScores = sortApiScores(trim(scores));

    if (orderedScores.length > count) {
      console.log("INSIDE!!!!!!", orderedScores)
      return orderedScores.slice(0, count);
    }
    console.log("OUTSIDE!!!!!!", orderedScores)
    return orderedScores;
  };

  return { topScores }
})();

export default ApiHelper;