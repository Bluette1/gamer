import Phaser from 'phaser';


export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  height: 650,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  callbacks: {
    postBoot: function(game, fullScreenMode = false) {
      // In v3.15, you have to override Phaser's default styles
      if (fullScreenMode) {
        game.canvas.style.width = '100%';
        game.canvas.style.height = '100%';
      } else {
        game.canvas.style.width = '800px';
        game.canvas.style.height = '650px';
      }

    }
  }
};