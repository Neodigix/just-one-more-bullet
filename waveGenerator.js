const enemiesClasses = [
  Enemy,
  SolidEnemy,
  SquareEnemy,
  SolidSquareEnemy
];

function generateWave(waveNum) {
  const x = waveNum;
  const dangerLvl = (x + 10 * Math.log(x))/2 + Math.abs((x-8));
  let currentDangerLvl = 0;
  while (currentDangerLvl < dangerLvl) {
    let enemyX = Math.random() * 1000;
    let enemyY = Math.random() * 1000;
    while (getDistance(enemyX, enemyY, gameVars.player.x, gameVars.player.y) < 150) {
      enemyX = Math.random() * 1000;
      enemyY = Math.random() * 1000;
    }
    const enemyClass = getRandomElementFromArray(enemiesClasses);
    const enemy = new enemyClass(
      enemyX,
      enemyY,
      40
    );
    enemies.push(enemy);
    currentDangerLvl += enemy.danger;
    console.log('e ' + enemy.danger);
    console.log('e d' + currentDangerLvl);
  }
}

function getNextWaveTime(waveNum) {
  if (waveNum < 3) {
    return 6;
  }
  if (waveNum < 6) {
    return 10;
  }
  if (waveNum < 9) {
    return 12;
  }
  return 15;
}
