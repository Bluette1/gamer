import 'phaser';
import Button from '../Objects/Button';

export default class SetUp extends Phaser.Scene {
  constructor() {
    super('SetUp');
  }

  create() {
    this.musicModel = this.sys.game.globals.musicModel;

    this.settingsText = this.add.text(300, 50, 'Set Up', { fontSize: 40 });
    this.musicBtn = this.add.image(200, 150, 'checkBox');
    this.musicTxt = this.add.text(250, 140, 'Turn on Music', { fontSize: 24 });

    this.soundBtn = this.add.image(200, 250, 'checkBox');
    this.soundTxt = this.add.text(250, 240, 'Turn on Sound', { fontSize: 24 });

    this.screenSizeBtn = this.add.image(200, 350, 'whiteBox');
    this.screenSizeTxt = this.add.text(250, 340, 'Enter full screen mode', { fontSize: 24 });

    this.darkModeBtn = this.add.image(200, 450, 'whiteBox');
    this.darkModeTxt = this.add.text(250, 440, 'Turn on dark mode', { fontSize: 24 });

    this.musicBtn.setInteractive();
    this.soundBtn.setInteractive();
    this.screenSizeBtn.setInteractive();
    this.darkModeBtn.setInteractive();

    this.musicBtn.on('pointerdown', function() {
      this.musicModel.turnMusicOn = !this.musicModel.musicPlaying;
      this.updateAudioPlayer();
    }.bind(this));

    this.soundBtn.on('pointerdown', function() {
      this.musicModel.turnSoundOn = !this.musicModel.soundPlaying;
      this.updateAudioPlayer();
    }.bind(this));

    this.screenSizeBtn.on('pointerdown', function() {
      this.fullScreen = !this.fullScreen;
      this.updateScreenSizeBtn();
    }.bind(this));

    this.darkModeBtn.on('pointerdown', function() {
      this.darkMode = !this.darkMode;
      this.updateDarkModeBtn();
    }.bind(this));

    this.menuBtn = new Button(this, 400, 550, 'firstBtn', 'secondBtn', 'Main Menu', 'Begin');

    this.updateAudioPlayer();
  }

  updateAudioPlayer() {
    if (this.musicModel.musicPlaying === false) {
      this.musicBtn.setTexture('whiteBox');
      this.sys.game.globals.backgroundMusic.stop();
      this.musicModel.backgroundMusic = false;
    } else {
      this.musicBtn.setTexture('checkBox');
      if (this.musicModel.backgroundMusic === false) {
        this.sys.game.globals.backgroundMusic.play();
        this.musicModel.backgroundMusic = true;
      }
    }

    if (this.musicModel.soundPlaying === false) {
      this.soundBtn.setTexture('whiteBox');
    } else {
      this.soundBtn.setTexture('checkBox');
    }
  }

  updateScreenSizeBtn() {
    this.screenSizeBtn.setTexture('checkBox');
  }

  updateDarkModeBtn() {
    this.darkModeBtn.setTexture('checkBox');

  }
};