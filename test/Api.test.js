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
  expect(mockUpdateScoreSpy).toHaveBeenCalledTimes(1);
  expect(mockUpdateScoreSpy).toHaveBeenCalledWith(null, message);
});

it('On failed update of a given score, the update score callback is called with error', async () => {
  const mockUpdateScoreSpy = jest.fn(() => {});

  const error = {
    error: 'some error',
  };

  axios.post.mockImplementation((url) => {
    if (url === `${baseUrl}/games/`) {
      return Promise.resolve({ data: { result: 'GameId' } });
    }
    return Promise.reject(error);
  });
  await Api.postApiScore('Tommy', 2000, mockUpdateScoreSpy);
  expect(mockUpdateScoreSpy).toHaveBeenCalledTimes(1);
  expect(mockUpdateScoreSpy).toHaveBeenCalledWith(error);
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
  expect(mockUpdateLeadersSpy).toHaveBeenCalledTimes(1);
  expect(mockUpdateLeadersSpy).toHaveBeenCalledWith(null, resultArray);
});

it('On failed retrieval of the game scores, the retrieve scores callback is called with error', async () => {
  const mockUpdateLeadersSpy = jest.fn(() => {});
  const error = {
    error: 'some error',
  };
  axios.post.mockResolvedValueOnce({
    data: { result: 'GameId' },
  });

  axios.get.mockRejectedValueOnce(error);
  await Api.getApiScores(mockUpdateLeadersSpy);
  expect(mockUpdateLeadersSpy).toHaveBeenCalledTimes(1);
  expect(mockUpdateLeadersSpy).toHaveBeenCalledWith(error);
});