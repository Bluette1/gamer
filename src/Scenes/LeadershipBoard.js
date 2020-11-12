import Phaser from 'phaser';
import config from '../Config/config';

export default class LeadershipBoard extends Phaser.Scene {
  constructor() {
    super('LeadershipBoard');
  }

  create() {
    this.text = this.add.text(0, 0, 'Leadership Board', { fontSize: '33px', fill: '#FFB6C1' });
    this.leadersZone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    this.waitText = this.add.text(0, 0, 'Waiting to be announced...', { fontSize: '33px', fill: '#FFB6C1' });

    Phaser.Display.Align.In.Center(
      this.text,
      this.leadersZone,
    );

    Phaser.Display.Align.In.Center(
      this.waitText,
      this.leadersZone,
    );

    this.text.setY(200);

    this.begin();
  }

  begin() {
    setTimeout(() => {
      this.scene.start('Title');
    }, 3000);
  }
}