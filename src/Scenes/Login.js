import Phaser from 'phaser';
import config from '../Config/config';

export default class Main extends Phaser.Scene {
  constructor() {
    super('Login');
  }

  preload() {
    this.load.html('login', '../../assets/login.html');
  }

  create() {
    const credentials = `
    Hello Gamer!

    Before we begin,
    let's get your credentials.

    Please enter your name 
    in the section above.
    `;

    this.text = this.add.text(0, 0, credentials, { color: '#FFB6C1', fontSize: '33px ' });
    this.loginZone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );

    Phaser.Display.Align.In.Center(
      this.text,
      this.loginZone,
    );
  }
}