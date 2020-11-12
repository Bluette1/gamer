import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class Title extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    this.gameBtn = new Button(this, config.width / 2, config.height / 2 - 150, 'firstBtn', 'secondBtn', 'Play', 'Game');

    this.settingsBtn = new Button(this, config.width / 2, config.height / 2 - 50, 'firstBtn', 'secondBtn', 'Set Up', 'SetUp');

    this.creditsBtn = new Button(this, config.width / 2, config.height / 2 + 50, 'firstBtn', 'secondBtn', 'Credits', 'Credits');

    this.leadershipBtn = new Button(this, config.width / 2, config.height / 2 + 150, 'firstBtn', 'secondBtn', 'Leader Board', 'LeadershipBoard');

    this.musicModel = this.sys.game.globals.musicModel;
    if (this.musicModel.musicPlaying === true && this.musicModel.backgroundMusic === false) {
      this.backgroundMusic = this.sound.add('music', { volume: 0.5, loop: true });
      this.backgroundMusic.play();
      this.musicModel.backgroundMusic = true;
      this.sys.game.globals.backgroundMusic = this.backgroundMusic;
    }
  }
}