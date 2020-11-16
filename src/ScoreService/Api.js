import axios from 'axios';

const Api = (() => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  const postApiGame = (name) => {
    axios.post(`${baseUrl}/games/`, { name })
      .then((response) => response.data.result)
      .catch(() => {});
  };

  const gameId = process.env.GAME_ID || postApiGame('Gamer');

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
    const orderedScores = sortApiScores(trim(scores));
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
    topScores,
  };
})();

export default Api;