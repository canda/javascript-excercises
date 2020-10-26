/**
 * Save humans, destroy zombies!
 **/

interface Point {
  x: number;
  y: number;
}

type Me = Point;

interface Human {
  id: number;
  x: number;
  y: number;
}

interface Zombie extends Human {
  nextX: number;
  nextY: number;
}

const distance = (p1: Point, p2: Point) =>
  Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

const timeToZombieArrival = (distance: number) => distance / 400;
const timeToMyArrival = (distance: number) => distance / 1000;

const firstZombieToArrive = (target: Point, zombies: Zombie[]) =>
  zombies.sort((z1, z2) => distance(target, z1) - distance(target, z2))[0];

const humanTimeToLive = (human: Human, zombies: Zombie[]) => {
  const zombie = firstZombieToArrive(human, zombies);
  return timeToZombieArrival(distance(human, zombie));
};

const canBeSavedHumans = (humans: Human[], zombies: Zombie[], me: Me) =>
  humans.filter((human) => {
    const zombieTime = humanTimeToLive(human, zombies);
    const mytTime = timeToMyArrival(distance(human, me));

    return mytTime < zombieTime;
  });

let targetZombie: Zombie;

// game loop
while (true) {
  var inputs = readline().split(' ');
  const x = parseInt(inputs[0]);
  const y = parseInt(inputs[1]);
  const me = { x, y };
  const humanCount = parseInt(readline());
  const humans: Human[] = [];
  for (let i = 0; i < humanCount; i++) {
    var inputs = readline().split(' ');
    const id = parseInt(inputs[0]);
    const x = parseInt(inputs[1]);
    const y = parseInt(inputs[2]);
    humans.push({ id, x, y });
  }
  const zombieCount = parseInt(readline());
  const zombies: Zombie[] = [];
  for (let i = 0; i < zombieCount; i++) {
    var inputs = readline().split(' ');
    const id = parseInt(inputs[0]);
    const x = parseInt(inputs[1]);
    const y = parseInt(inputs[2]);
    const nextX = parseInt(inputs[3]);
    const nextY = parseInt(inputs[4]);
    zombies.push({ id, x, y, nextX, nextY });
  }

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  // don't change target until it dies
  if (targetZombie) {
    const targetZombieUpdated = zombies.find((z) => z.id === targetZombie.id);
    if (targetZombieUpdated) {
      targetZombie = targetZombieUpdated;
      console.log(`${targetZombie.x} ${targetZombie.y}`);
      continue;
    }
  }

  const firstHumanToSave = canBeSavedHumans(humans, zombies, me).sort(
    (h1, h2) => humanTimeToLive(h1, zombies) - humanTimeToLive(h2, zombies),
  )[0];

  targetZombie = firstHumanToSave
    ? firstZombieToArrive(firstHumanToSave, zombies)
    : zombies[0];

  console.log(`${targetZombie.x} ${targetZombie.y}`); // Your destination coordinates
}
