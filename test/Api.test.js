const axios = require('axios');
const { default: Api } = require('../src/ScoreService/Api');

const baseUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const resultArray = [{
  user: 'Jane',
  score: 1000,
},
{
  user: 'Mary',
  score: 1200,
},
{
  user: 'Scott',
  score: 1500,
},
{
  user: 'Anne',
  score: 2500,
},
{
  user: 'John',
  score: 3500,
},
];

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

it('should post a given score', async () => {
  const mockUpdateScoreSpy = jest.fn(() => {});
  const message = 'Success message';

  axios.post.mockImplementation((url) => {
    if (url === `${baseUrl}/games/`) {
      return Promise.resolve({ data: { result: 'GameId' } });
    }
    return Promise.resolve({ data: { result: message } });
  });

  await Api.postApiScore('Tommy', 2000, mockUpdateScoreSpy);
  expect(mockUpdateScoreSpy).toHaveBeenCalledWith(null, message);
});

it('should return the game scores', async () => {
  const mockUpdateLeadersSpy = jest.fn(() => {});

  axios.post.mockResolvedValueOnce({
    data: { result: 'GameId' },
  });

  axios.get.mockResolvedValueOnce({
    data: { result: resultArray },
  });
  await Api.getApiScores(mockUpdateLeadersSpy);
  expect(mockUpdateLeadersSpy).toHaveBeenCalledWith(null, resultArray);
});