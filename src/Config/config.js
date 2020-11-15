import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  height: 750,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  callbacks: {
    postBoot(game, fullScreenMode = false) {
      if (fullScreenMode) {
        game.canvas.style.width = '100%';
        game.canvas.style.height = '100%';

      } else {
        game.canvas.style.width = '800px';
        game.canvas.style.height = '750px';
      }
    },
  },
};