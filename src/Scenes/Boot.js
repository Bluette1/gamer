import Phaser from 'phaser';

export default class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', '../../assets/gamer_logo.png');
  }

  create() {
    this.scene.start('Preload');
  }
}