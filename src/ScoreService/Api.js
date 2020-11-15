import axios from 'axios';

const Api = (() => {
  const gameId = process.env.GAME_ID;
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  const getApiScores = (callback) => {
    axios.get(`${baseUrl}/games/${gameId}/scores/`)
      .then((response) => callback(null, response.data.result))
      .catch((error) => callback(error));
  };

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
    const orderedScores = trim(sortApiScores(scores));
    if (orderedScores.length > count) {
      orderedScores.splice(count, orderedScores.length - count);
    }
    return orderedScores;
  };

  const postApiScore = (user, score, callback) => {
    axios.post(`${baseUrl}/games/${gameId}/scores/`, { user, score })
      .then((response) => callback(null, response.data.result))
      .catch((error) => callback(error));
  };

  return {
    getApiScores,
    sortApiScores,
    postApiScore,
    trim,
    topScores,
  };
})();

export default Api;