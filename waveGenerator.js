const enemiesClasses = [
  Enemy,
  SolidEnemy
];

function generateWave(waveNum) {
  const dangerLvl = Math.log(waveNum + 1) * 1;
  let currentDangerLvl = 0;
  while (currentDangerLvl < dangerLvl) {
    let enemyX = Math.random() * 1000;
    let enemyY = Math.random() * 1000;
    while (getDistance(enemyX, enemyY, player.x, player.y) < 150) {
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
