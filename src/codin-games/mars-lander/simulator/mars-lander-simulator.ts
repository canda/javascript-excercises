const marsLanderSimulator = () => {
  type Coordinate = {
    x: number;
    y: number;
  };
  type Velocity = {
    horizontal: number;
    vertical: number;
  };
  type GameInput = {
    thrust: number;
    rotation: number;
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

  const gameTurn = (newInput: { thrust: number; rotation: number }) => {
    // calculate accelerations
    const verticalAcceleration =
      Math.cos(degreesToRadians(currentState.rotation)) * currentState.thrust -
      MARS_GRAVITY;
    const horizontalAcceleration =
      Math.sin(degreesToRadians(-currentState.rotation)) * currentState.thrust;

    // set new position
    const previousPosition = { ...currentState.position };
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
    currentState.rotation = newInput.rotation;
    currentState.thrust = newInput.thrust;

    // render on svg the new position rotation and thrust
    render(currentState.position, currentState.rotation, currentState.thrust);

    const collided = didCollideWithFloor(
      FLOOR_POINTS,
      previousPosition,
      currentState.position,
    );

    return {
      collided,
      landedSuccesfully: false,
      position: currentState.position,
    };
  };

  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomInput = (previousRotation: number): GameInput => ({
    rotation: previousRotation + randomInt(-15, 15),
    thrust: randomInt(0, 4),
  });

  const randomRun: GameInput[] = [];
  for (let i = 0; i < 100; i++) {
    randomRun.push(
      randomInput(i === 0 ? INITIAL_ROTATION : randomRun[i - 1].rotation),
    );
  }

  console.log(JSON.stringify(randomRun));

  // segment intersection
  // to see if we have collided, we have to check whether the segment between our last position and our new position intersects with any segment of the floor

  const didCollideWithFloor = (
    floor: Coordinate[],
    previousPosition: Coordinate,
    newPosition: Coordinate,
  ): boolean => {
    type Segment = [Coordinate, Coordinate];
    const ccw = (A: Coordinate, B: Coordinate, C: Coordinate) =>
      (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
    const doesSegmentsIntersect = (segment1: Segment, segment2: Segment) =>
      ccw(segment1[0], segment2[0], segment2[1]) !==
        ccw(segment1[1], segment2[0], segment2[1]) &&
      ccw(segment1[0], segment1[1], segment2[0]) !=
        ccw(segment1[0], segment1[1], segment2[1]);

    const positionSegment: Segment = [previousPosition, newPosition];
    let collidedWithFloor = false;
    for (let i = 0; i < floor.length - 1; i++) {
      const floorSegment: Segment = [floor[i], floor[i + 1]];
      if (doesSegmentsIntersect(positionSegment, floorSegment)) {
        collidedWithFloor = true;
        break;
      }
    }

    return collidedWithFloor;
  };

  let turn = 0;
  const intervalId = setInterval(() => {
    const result = gameTurn(randomRun[turn]);
    console.log(result);
    if (result.collided) {
      clearInterval(intervalId);
    } else {
      turn++;
    }
  }, 300);
};
marsLanderSimulator();
