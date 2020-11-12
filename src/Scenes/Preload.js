import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  init() {
    this.beginCount = 0;
  }

  preload() {
    // add the logo image
    this.add.image(400, 200, 'logo');

    // display the progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    // rgb(25,25,25)
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(242, 272, 321, 53);

    const lengthX = this.cameras.main.width;
    const lengthY = this.cameras.main.height;
    const loadingText = this.make.text({
      x: lengthX / 2,
      y: lengthY / 2 - 50,
      text: 'Loading...',
      style: {
        font: '22px monospace',
        fill: '#FFB6C1',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentageText = this.make.text({
      x: lengthX / 2,
      y: lengthY / 2 - 5,
      text: '0%',
      style: {
        font: '20px monospace',
        fill: '#FFB6C1',
      },
    });
    percentageText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: lengthX / 2,
      y: lengthY / 2 + 50,
      text: '',
      style: {
        font: '20px monospace',
        fill: '#FFB6C1',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update the progress bar
    this.load.on('progress', (value) => {
      percentageText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xFFB6C1, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update the file progress text
    this.load.on('fileprogress', (fileLoading) => {
      assetText.setText(`Loading asset: ${fileLoading.key}`);
    });

    // remove the progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentageText.destroy();
      assetText.destroy();
      this.begin();
    });

    this.timedEvent = this.time.delayedCall(3000, this.begin, [], this);

    // load the assets necessary for the game
    this.load.image('firstBtn', '../../assets/ui/first_button.png');
    this.load.image('secondBtn', '../../assets/ui/second_button.png');
    this.load.image('gamerLogo', '../../assets/gamer_logo.png');
    this.load.image('whiteBox', '../../assets/ui/box.png');
    this.load.image('checkBox', '../../assets/ui/checkmark.png');
    this.load.audio('music', ['../../assets/1-01_the_4th_detonator.mp3']);
  }

  begin() {
    this.scene.start('Title');
    this.beginCount += 1;
    if (this.beginCount === 2) {
      this.scene.start('Title');
    }
  }
}