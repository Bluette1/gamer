import Phaser from 'phaser';
import config from '../Config/config';

export default class Main extends Phaser.Scene {
  constructor() {
    super('Main');
  }

  preload() {}

  create() {
    this.text = this.add.text(
      0,
      0,
      '*****    Welcome Super Gamer!   ****', {
        color: 'white',
        fontSize: '23px',
        texTransform: 'uppercase',
      },
    );
    this.instructionsZone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );
    const guidelines = ` 
          Instructions for game

          - Press the keyboard left, right, up, 
          and down to move left, right, up, and down
          respectively. 
          - Press the up key multiple times
          for multiple jumps. 
          - The player must avoid the shell in order to
            stay alive. 

            
                  
          *** Enjoy the Game! ***
    `;

    this.instructions = this.add.text(0, 0, guidelines, { color: 'white', fontSize: '23px', texTransform: 'uppercase' });
    Phaser.Display.Align.In.Center(
      this.text,
      this.instructionsZone,
    );
    Phaser.Display.Align.In.Center(
      this.instructions,
      this.instructionsZone,
    );
    this.text.setY(200);
    this.instructions.setY(300);
  }

  update() {}

  begin() {
    setTimeout(() => {
      this.scene.start('Title');
    }, 5000);
  }
}