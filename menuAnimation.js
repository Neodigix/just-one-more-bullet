const menuAnimParticles = [
];

function initMenuAnimParticles() {
  for (let i = 0; i < 30; i++){
    let particle = {
      x: Math.random()*1200-200,
      y: Math.random()*1000
    };
    particle.direction = normalizeVector([
      Math.random()*200-100,
      Math.random()*200-100
    ]);
    menuAnimParticles.push(particle);
  }
}

function updateAndDrawMenuAnimation(ctx, deltaTime) {
  if (menuAnimParticles.length == 0) {
    initMenuAnimParticles();
  }
  // Update positons
  for (let i = 0; i < menuAnimParticles.length; i++) {
    const particle = menuAnimParticles[i];
    let newX = particle.x + (particle.direction[0] * 400 * deltaTime);
    let newY = particle.y + (particle.direction[1] * 400 * deltaTime);
    particle.x = newX;
    particle.y = newY;
    if (particle.x < -200) {
      particle.x += 1200;
    }
    else if (particle.x > 1000) {
      particle.x -= 1200;
    }
    if (particle.y < 0) {
      particle.y += 1000;
    }
    else if (particle.y > 1000) {
      particle.y -= 1000;
    }
  }
  
  // Update positons
  for (let i = 0; i < menuAnimParticles.length; i++) {
    const particle = menuAnimParticles[i];
    const pos = convertPosToCanvas(particle.x, particle.y);
    ctx.fillStyle = colors.bullet;
    ctx.beginPath();
    ctx.arc(
      pos[0],  // x
      pos[1],  // y
      5*scale,  // radius
      0,  // starting angle
      2 * Math.PI  // ending angle
    )
    ctx.fill();
  }
}
