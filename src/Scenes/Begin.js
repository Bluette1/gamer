import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class Begin extends Phaser.Scene {
  constructor() {
    super('Begin');
  }

  create() {
    this.gameBtn = new Button(this, config.width / 2, config.height / 2 - 100, 'firstBtn', 'secondBtn', 'Play', 'Game');


    this.settingsBtn = new Button(this, config.width / 2, config.height / 2, 'firstBtn', 'secondBtn', 'Set Up', 'SetUp');


    this.creditsBtn = new Button(this, config.width / 2, config.height / 2 + 100, 'firstBtn', 'secondBtn', 'Credits', 'Credits');

    this.musicModel = this.sys.game.globals.musicModel;
    if (this.musicModel.musicPlaying === true && this.musicModel.backgroundMusic === false) {
      this.backgroundMusic = this.sound.add('music', { volume: 0.5, loop: true });
      this.backgroundMusic.play();
      this.musicModel.backgroundMusic = true;
      this.sys.game.globals.backgroundMusic = this.backgroundMusic;
    }
  }

  centerButton(gameObject, offset = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width / 2, config.height / 2 - offset * 100, config.width, config.height)
    );
  }

  centerButtonText(gameText, gameButton) {
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }
};