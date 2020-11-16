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
import Main from './Scenes/Main';
import Login from './Scenes/Login';

let user = '';

class GamePlay extends Phaser.Game {
  constructor() {
    super(config);

    const musicModel = new MusicModel();
    this.globals = {
      musicModel,
      backgroundMusic: null,
      fullScreen: false,
      darkMode: false,
      leaders: [],
      score: 0,
      user,
    };
    this.scene.add('Boot', Boot);
    this.scene.add('Preload', Preload);
    this.scene.add('Title', Title);
    this.scene.add('Settings', SetUp);
    this.scene.add('Credits', Credits);
    this.scene.add('Game', Game);
    this.scene.add('LeadershipBoard', LeadershipBoard);
    this.scene.add('Main', Main);
    this.scene.add('Login', Login);
    this.scene.start('Boot');
  }

  set currentUser(user) {
    this.globals.user = user;
  }
}

const formContainer = document.querySelector('#form-container');
const initialsSection = document.querySelector('form');

const playerNameInput = document.querySelector('#name-field ');
const submitBtn = document.querySelector('#play-button');

submitBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  user = playerNameInput.value;
  if (user && user !== '') {
    initialsSection.reset();
    formContainer.classList.add('hidden');
    window.game.currentUser = user;
    window.game.scene.stop('Login');
    window.game.scene.start('Main');
  }
});

window.game = new GamePlay();