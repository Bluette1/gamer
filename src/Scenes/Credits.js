import Phaser from 'phaser';
import config from '../Config/config';

export default class Credits extends Phaser.Scene {
  constructor() {
    super('Credits');
  }

  create() {
    this.text = this.add.text(0, 0, 'Credits', { fontSize: '33px', fill: '#FFB6C1' });
    this.creatorText = this.add.text(0, 0, 'Created By: Gamer', { fontSize: '28px', fill: '#FFB6C1' });
    this.creditsZone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );
    this.creatorWebAddress = this.add.text(0, 0, 'Visit https://portfolio-ms-app.herokuapp.com/', { fontSize: '28px', fill: '#FFB6C1' });
    this.creatorEmail = this.add.text(0, 0, 'Email: marylene.sawyer@gmail.com', { fontSize: '28px', fill: '#FFB6C1' });

    Phaser.Display.Align.In.Center(
      this.text,
      this.creditsZone,
    );

    Phaser.Display.Align.In.Center(
      this.creatorText,
      this.creditsZone,
    );

    Phaser.Display.Align.In.Center(
      this.creatorWebAddress,
      this.creditsZone,
    );

    Phaser.Display.Align.In.Center(
      this.creatorEmail,
      this.creditsZone,
    );

    this.creatorText.setY(990);

    this.creatorWebAddress.setY(1190);

    this.creatorEmail.setY(1390);

    this.creditsTween = this.tweens.add({
      targets: this.text,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 1000,
      onComplete() {
        this.remove = this.destroy;
      },
    });

    this.creatorWebAddressTween = this.tweens.add({
      targets: this.creatorText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete() {
        this.remove = this.destroy;
      },
    });

    this.creatorEmailTween = this.tweens.add({
      targets: this.creatorWebAddress,
      y: -500,
      ease: 'Power1',
      duration: 13000,
      delay: 1000,
      onComplete() {
        this.remove = this.destroy;
      },
    });

    this.creatorTween = this.tweens.add({
      targets: this.creatorEmail,
      y: -700,
      ease: 'Power1',
      duration: 18000,
      delay: 1000,
      onComplete() {
        this.remove = this.creatorTween.destroy;
        this.scene.start('Title');
      },
    });
  }
}