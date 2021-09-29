const marsLanderSimulator = () => {
  type Coordinate = {
    x: number;
    y: number;
  };
  type Velocity = {
    horizontal: number;
    vertical: number;
  };

  const FLOOR_POINTS: Coordinate[] = [
    { x: 0, y: 100 },
    { x: 1000, y: 500 },
    { x: 1500, y: 1500 },
    { x: 3000, y: 1000 },
    { x: 4000, y: 150 },
    { x: 5500, y: 150 },
    { x: 6999, y: 800 },
  ];

  const MARS_GRAVITY = 3.721;
  const INITIAL_POSITION: Coordinate = { x: 2500, y: 2700 };
  const INITIAL_VELOCITY = { horizontal: 0, vertical: 0 };
  const INITIAL_ROTATION = 0;
  const INITIAL_THRUST = 0;

  const svgElement = document.querySelector('#simulator-svg');

  const floorPolyline = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'polyline',
  );
  floorPolyline.setAttribute(
    'points',
    FLOOR_POINTS.map((p) => `${p.x},${p.y}`).join(' '),
  );
  floorPolyline.setAttribute('stroke', 'red');
  floorPolyline.setAttribute('id', 'floor');
  floorPolyline.setAttribute('stroke-width', '20');
  floorPolyline.setAttribute('fill', 'none');
  svgElement.appendChild(floorPolyline);

  const currentState = {
    position: INITIAL_POSITION,
    velocity: INITIAL_VELOCITY,
    rotation: INITIAL_ROTATION,
    thrust: INITIAL_THRUST,
  };

  const rocketElement = document.querySelector('#rocket');
  const rocketFireElement = document.querySelector('#rocket-fire');
  const render = (position: Coordinate, rotation: number, thrust: number) => {
    rocketElement.setAttribute(
      'transform',
      `translate(${position.x},${position.y}) rotate(${rotation})`,
    );
    rocketFireElement.setAttribute(
      'transform',
      // translation is a hack
      `translate(0,${200 * (thrust - 1)}) scale(1,${thrust})`,
    );
  };

  const degreesToRadians = (degrees: number) => (degrees * Math.PI) / 180;

  const gameTurn = (newThrust: number, newRotation: number) => {
    // calculate accelerations
    const verticalAcceleration =
      Math.cos(degreesToRadians(currentState.rotation)) * currentState.thrust -
      MARS_GRAVITY;
    const horizontalAcceleration =
      Math.sin(degreesToRadians(-currentState.rotation)) * currentState.thrust;

    // set new position
    currentState.position.x =
      currentState.position.x +
      currentState.velocity.horizontal +
      horizontalAcceleration / 2;
    currentState.position.y =
      currentState.position.y +
      currentState.velocity.vertical +
      verticalAcceleration / 2;

    // set new velocity
    currentState.velocity.horizontal =
      currentState.velocity.horizontal + horizontalAcceleration;
    currentState.velocity.vertical =
      currentState.velocity.vertical + verticalAcceleration;

    // set input rotation and thrust
    currentState.rotation = newRotation;
    currentState.thrust = newThrust;

    console.log(currentState.position);
    console.log(currentState.velocity);
    console.log({ verticalAcceleration, horizontalAcceleration });

    // render on svg the new position rotation and thrust
    render(currentState.position, currentState.rotation, currentState.thrust);
  };

  setInterval(() => {
    gameTurn(4, 90);
  }, 1000);
};
marsLanderSimulator();
