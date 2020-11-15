import axios from 'axios';

const Api = (() => {
  const gameId = process.env.GAME_ID;
  const base_url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

  const getApiScores = (callback) => {
    axios.get(`${base_url}/games/${gameId}/scores/`)
      .then(function(response) {
        return callback(response.data.result);
      })
      .catch(function(error) {
        console.log(error);
      });
  }


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

  const postApiScore = (user, score) => {
    axios.post(`${base_url}/games/${gameId}/scores/`, { user, score })
      .then(function(response) {
        console.log(
          'Score was successfully updated',
          response.data.result
        );

      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return {
    getApiScores,
    sortApiScores,
    postApiScore,
    trim,
    topScores,
  };
})();

export default Api;