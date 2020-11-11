import 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    this.load.image('logo', '../../assets/gamer_logo.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
};