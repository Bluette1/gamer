import axios from 'axios';

const Api = (() => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  const postApiGame = (name) => axios.post(`${baseUrl}/games/`, { name })
    .then((response) => response.data.result)
    .catch(() => {});

  const gameId = process.env.GAME_ID || postApiGame('Gamer');

  const getApiScores = (callback) => axios.get(`${baseUrl}/games/${gameId}/scores/`)
    .then((response) => callback(null, response.data.result))
    .catch((error) => callback(error));

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