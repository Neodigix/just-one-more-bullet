let gameVars = {
  nextId: 0,
  wave: 0,
  enemyTime: 3,
  player: new Player(
    500,  // x
    500,  // y
    3,  // hp
    80, // size
    200,  // speed
    new Pistol(),
  ),
  items: [],
  newItems: [],
  
  // menu, game, death, upgrade
  gameState: 'menu',
  view: null,
  
  transferDelay: 20,
  
  // Game scale related
  offsetX: 0,
  offsetY: 0,
  uiOffsetX: 0,
  scale: 1,
  
  soundPlayer: new SoundPlayer()
};