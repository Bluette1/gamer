import axios from 'axios';
import { ResolvePlugin } from 'webpack';

const Api = (() => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  const postApiGame = (name) => new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/games/`, { name })
      .then((response) => resolve(response.data.result))
      .catch((error) => reject(error));
  });
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
    postApiGame,
    postApiScore,
  };
})();

export default Api;