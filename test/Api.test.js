const axios = require('axios');
const { default: Api } = require('../src/ScoreService/Api');

jest.mock('axios');
afterEach(() => {
  jest.clearAllMocks();
});

it('should return the game id', async () => {
  axios.post.mockResolvedValueOnce({
    data: { result: 'GameId' },
  });
  const gameId = await Api.postApiGame('Gamer');
  expect(gameId).toEqual('GameId');
});