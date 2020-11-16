const { default: Api } = require("../src/ScoreService/Api");

const axios = require('axios');
const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
jest.mock('axios');
afterEach(() => {
  jest.clearAllMocks();
});

it('should properly decorate the fullName', async() => {
  axios.post.mockResolvedValueOnce({
    data: { result: "GameId" }
  });
  const gameId = await Api.postApiGame('Gamer');
  expect(gameId).toEqual("GameId");
});