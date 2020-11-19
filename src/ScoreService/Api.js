import axios from 'axios';

const Api = (() => {
  const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  const postApiGame = (name, callback) => axios.post(`${baseUrl}/games/`, { name })
    .then((response) => callback(null, response.data.result))
    .catch((error) => callback(error));

  const updateGameId = ((error, id) => {
    let gameId;
    if (id) {
      gameId = id;
    }
    return gameId;
  });
  const gameId = () => process.env.GAME_ID || postApiGame('Gamer', updateGameId);

  const getApiScores = (callback) => axios.get(`${baseUrl}/games/${gameId()}/scores/`)
    .then((response) => callback(null, response.data.result))
    .catch((error) => callback(error));

  const postApiScore = (user, score, callback) => axios.post(`${baseUrl}/games/${gameId()}/scores/`, { user, score })
    .then((response) => callback(null, response.data.result))
    .catch((error) => callback(error));

  return {
    getApiScores,
    postApiGame,
    postApiScore,
  };
})();

export default Api;