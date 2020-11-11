import 'phaser';
import config from './Config/config';
// import GameScene from './Scenes/GameScene';
import Boot from './Scenes/Boot';
import Preload from './Scenes/Preload';
import Begin from './Scenes/Begin';
import SetUp from './Scenes/SetUp';
import Credits from './Scenes/Credits';
import MusicModel from './MusicModel';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const musicModel = new MusicModel();
    this.globals = { musicModel, backgroundMusic: null };
    this.scene.add('Boot', Boot);
    this.scene.add('Preload', Preload);
    this.scene.add('Begin', Begin);
    this.scene.add('Settings', SetUp);
    this.scene.add('Credits', Credits);
    // this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();