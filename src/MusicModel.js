export default class MusicModel {
  constructor() {
    this._soundEnabled = true;
    this._musicEnabled = true;
    this._backgroundMusicPlaying = false;
  }

  set turnMusicOn(value) {
    this._musicEnabled = value;
  }

  get musicPlaying() {
    return this._musicEnabled;
  }

  set turnSoundOn(value) {
    this._soundEnabled = value;
  }

  get soundPlaying() {
    return this._soundEnabled;
  }

  set backgroundMusic(value) {
    this._backgroundMusicPlaying = value;
  }

  get backgroundMusic() {
    return this._backgroundMusicPlaying;
  }
}