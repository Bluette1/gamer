export default class MusicModel {
  constructor() {
    this.soundEnabled = true;
    this.musicEnabled = true;
    this.backgroundMusicPlaying = false;
  }

  set turnMusicOn(value) {
    this.musicEnabled = value;
  }

  get musicPlaying() {
    return this.musicEnabled;
  }

  set turnSoundOn(value) {
    this.soundEnabled = value;
  }

  get soundPlaying() {
    return this.soundEnabled;
  }

  set backgroundMusic(value) {
    this.backgroundMusicPlaying = value;
  }

  get backgroundMusic() {
    return this.backgroundMusicPlaying;
  }
}