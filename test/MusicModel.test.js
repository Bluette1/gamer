import MusicModel from '../src/MusicModel';

test('The default `musicPlaying` property is correctly set', () => {
  const MusicModelObj = new MusicModel();
  expect(MusicModelObj.musicPlaying).toEqual(true);
});

test('The default `soundPlaying` property is correctly set', () => {
  const MusicModelObj = new MusicModel();
  expect(MusicModelObj.soundPlaying).toEqual(true);
});

test('The default `backgroundMusic` property is correctly set', () => {
  const MusicModelObj = new MusicModel();
  expect(MusicModelObj.backgroundMusic).toEqual(false);
});

test('The background music property can be turned on', () => {
  const MusicModelObj = new MusicModel();
  MusicModelObj.turnMusicOn = true;
  expect(MusicModelObj.musicPlaying).toEqual(true);
});

test('The background music property can be turned off', () => {
  const MusicModelObj = new MusicModel();
  MusicModelObj.turnMusicOn = false;
  expect(MusicModelObj.musicPlaying).toEqual(false);
});

test('The sound property can be turned on', () => {
  const MusicModelObj = new MusicModel();
  MusicModelObj.turnSoundOn = true;
  expect(MusicModelObj.soundPlaying).toEqual(true);
});

test('The sound property can be turned off', () => {
  const MusicModelObj = new MusicModel();
  MusicModelObj.turnSoundOn = false;
  expect(MusicModelObj.soundPlaying).toEqual(false);
});

test('The `background music playing` property can be turned on', () => {
  const MusicModelObj = new MusicModel();
  MusicModelObj.backgroundMusic = true;
  expect(MusicModelObj.backgroundMusic).toEqual(true);
});

test('The `background music playing` property can be turned off', () => {
  const MusicModelObj = new MusicModel();
  MusicModelObj.backgroundMusic = false;
  expect(MusicModelObj.backgroundMusic).toEqual(false);
});