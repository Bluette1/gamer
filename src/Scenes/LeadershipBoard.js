import Phaser from 'phaser';
import config from '../Config/config';
import Api from '../ScoreService/Api';

export default class LeadershipBoard extends Phaser.Scene {
  constructor() {
    super('LeadershipBoard');
  }
  init() {
    this.leaders = this.sys.game.globals.leaders;
  }

  create() {
    this.text = this.add.text(0, 0, 'Leadership Board', { fontSize: '33px', fill: '#FFB6C1' });
    this.leadersZone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    );


    if (this.leaders) {
      this.leaders = Api.topScores(5, this.leaders);

      let displayScores = '';
      this.leaders.forEach(entry => {
        displayScores += `\n${entry.user}: ${entry.score}`;
      });
      this.header = this.add.text(1, 1, 'Top 10 Gamers', { fontSize: 40, fill: '#FFB6C1' });
      this.scores = this.add.text(1, 1, displayScores, { lineSpacing: 20 });
      Phaser.Display.Align.In.Center(this.header, this.leadersZone, 0, -250);
      Phaser.Display.Align.In.Center(this.scores, this.leadersZone, 0, -50);
    } else {
      const err = this.add.text(0, 0, `There was a problem connecting to the Leaderboard API!`);
      Phaser.Display.Align.In.Center(err, this.leadersZone);
    }

    Phaser.Display.Align.In.Center(
      this.text,
      this.leadersZone,
    );

    this.text.setY(200);

    this.begin();
  }

  begin() {
    setTimeout(() => {
      this.scene.start('Title');
    }, 7000);
  }
}