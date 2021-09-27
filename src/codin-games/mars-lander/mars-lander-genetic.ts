/**
 * Save the Planet.
 * Use less Fossil Fuel.
 **/

const marsLanderGenetic = () => {
  interface Coordinate {
    x: number;
    y: number;
  }

  const surfacePointsCount: number = parseInt(readline()); // the number of points used to draw the surface of Mars.
  const surface: Coordinate[] = [];
  let flatGroundY;
  let flatGroundLeftX;
  let flatGroundRightX;
  let flatGroundMiddleX;
  for (let i = 0; i < surfacePointsCount; i++) {
    var inputs: string[] = readline().split(' ');
    const x: number = parseInt(inputs[0]); // X coordinate of a surface point. (0 to 6999)
    const y: number = parseInt(inputs[1]); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.

    // find flat ground
    const lastCoordinate = surface[surface.length - 1];
    if (lastCoordinate && lastCoordinate.y === y) {
      flatGroundLeftX = lastCoordinate.x;
      flatGroundRightX = x;
      flatGroundY = y;

      flatGroundMiddleX = (lastCoordinate.x + x) / 2;
    }

    surface.push({ x, y });
  }

  console.error('surface', surface);

  const MAX_LANDING_VELOCITY = { x: 20 * 0.8, y: 40 * 0.8 };
  const radiansToDegrees = (radians: number) => (radians * 180) / Math.PI;
  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  // game loop
  while (true) {
    var inputs: string[] = readline().split(' ');
    const X: number = parseInt(inputs[0]);
    const Y: number = parseInt(inputs[1]);
    const HS: number = parseInt(inputs[2]); // the horizontal speed (in m/s), can be negative.
    const VS: number = parseInt(inputs[3]); // the vertical speed (in m/s), can be negative.
    const F: number = parseInt(inputs[4]); // the quantity of remaining fuel in liters.
    const R: number = parseInt(inputs[5]); // the rotation angle in degrees (-90 to 90).
    const P: number = parseInt(inputs[6]); // the thrust power (0 to 4).

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');

    const target = { x: flatGroundMiddleX, y: flatGroundY };
    console.error('target', target);

    const timeToX = Math.abs(target.x - X) / Math.abs(HS);
    const minTimeToX = Math.abs(target.x - X) / MAX_LANDING_VELOCITY.x;
    const timeToY = (Y - target.y) / Math.abs(VS);
    const minTimeToY = (Y - target.y) / MAX_LANDING_VELOCITY.y;

    const timeToArrive = Math.min(timeToX, minTimeToX, timeToY, minTimeToY);

    console.error('timeToArrive', timeToArrive);

    // `R P`. `R` is the desired rotation angle. `P` is the desired thrust power.
    console.log(`0 4`);
  }
};

marsLanderGenetic();
