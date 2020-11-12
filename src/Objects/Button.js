import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(contextScene, width, height, firstBtn, secondBtn, text, targetedScene) {
    super(contextScene);
    this.scene = contextScene;
    this.x = width;
    this.y = height;

    this.button = this.scene.add.sprite(0, 0, firstBtn).setInteractive();
    this.text = this.scene.add.text(0, 0, text, { fontSize: '33px', fill: '#ffffff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.scene.scene.start(targetedScene);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(secondBtn);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(firstBtn);
    });

    this.scene.add.existing(this);
  }
}