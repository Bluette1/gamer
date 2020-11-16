import ApiHelper from '../src/ScoreService/ApiHelper';

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
test('the top scores are returned when array length is not  > than count', () => {
  const sortedArray = [
    { user: 'John', score: 3500 },
    { user: 'Anne', score: 2500 },
    { user: 'Scott', score: 1500 },
    { user: 'Mary', score: 1200 },
    { user: 'Jane', score: 1000 },
  ];
  expect(ApiHelper.topScores(5, resultArray)).toEqual(sortedArray);
});

test('the top scores are returned when array length is  > than count', () => {
  const sortedArray = [
    { user: 'John', score: 3500 },
    { user: 'Anne', score: 2500 },
    { user: 'Scott', score: 1500 },
  ];
  expect(ApiHelper.topScores(3, resultArray)).toEqual(sortedArray);
});

test('the top scores are returned without duplicate entries', () => {
  const sortedArray = [
    { user: 'John', score: 3500 },
    { user: 'Anne', score: 2500 },
    { user: 'Scott', score: 1500 },
  ];
  const resultArray = [
    { user: 'John', score: 3500 },
    { user: 'Anne', score: 1500 },
    { user: 'Anne', score: 2500 },
    { user: 'Scott', score: 1500 },
    { user: 'John', score: 500 },
  ];
  expect(ApiHelper.topScores(3, resultArray)).toEqual(sortedArray);
});

test('the top scores are returned without invalid entries: negative scores or empty names', () => {
  const sortedArray = [
    { user: 'John', score: 3500 },
    { user: 'Anne', score: 1500 },
  ];
  const resultArray = [
    { user: 'John', score: 3500 },
    { user: 'Anne', score: 1500 },
    { user: '', score: 2500 },
    { user: 'Jane', score: -1 },
  ];
  expect(ApiHelper.topScores(3, resultArray)).toEqual(sortedArray);
});