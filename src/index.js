import Phaser from 'phaser';
import config from './Config/config';
import Game from './Scenes/Game';
import Boot from './Scenes/Boot';
import Preload from './Scenes/Preload';
import Title from './Scenes/Title';
import SetUp from './Scenes/SetUp';
import Credits from './Scenes/Credits';
import LeadershipBoard from './Scenes/LeadershipBoard';
import MusicModel from './MusicModel';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
class GamePlay extends Phaser.Game {
  constructor() {
    super(config);

    const musicModel = new MusicModel();
    this.globals = {
      musicModel,
      backgroundMusic: null,
      fullScreen: false,
      darkMode: false,
      url,
      leaders: null,
    };
    this.scene.add('Boot', Boot);
    this.scene.add('Preload', Preload);
    this.scene.add('Title', Title);
    this.scene.add('Settings', SetUp);
    this.scene.add('Credits', Credits);
    this.scene.add('Game', Game);
    this.scene.add('LeadershipBoard', LeadershipBoard);
    this.scene.start('Boot');
  }
}

window.game = new GamePlay();