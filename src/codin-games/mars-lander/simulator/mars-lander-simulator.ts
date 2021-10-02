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

  type GameState = {
    position: Coordinate;
    velocity: Velocity;
    rotation: number;
    thrust: number;
  };

  type GameRun = {
    positions: Coordinate[];
    finalPosition: Coordinate;
    finalVelocity: Velocity;
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

  const createPolyline = (coordinates: Coordinate[], id = '') => {
    const polyLineElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'polyline',
    );
    polyLineElement.setAttribute(
      'points',
      coordinates.map((p) => `${Math.round(p.x)},${Math.round(p.y)}`).join(' '),
    );
    polyLineElement.setAttribute('stroke', 'red');
    polyLineElement.setAttribute('stroke-width', '20');
    polyLineElement.setAttribute('fill', 'none');

    return polyLineElement;
  };

  const floorPolyline = createPolyline(FLOOR_POINTS);
  svgElement.appendChild(floorPolyline);

  const rocketElement = document.querySelector('#rocket');
  const rocketFireElement = document.querySelector('#rocket-fire');
  const renderTurn = (
    position: Coordinate,
    rotation: number,
    thrust: number,
  ) => {
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

  const gameTurn = (
    newInput: { thrust: number; rotation: number },
    currentState: GameState,
  ) => {
    const newState = { ...currentState };

    // calculate accelerations
    const verticalAcceleration =
      Math.cos(degreesToRadians(currentState.rotation)) * currentState.thrust -
      MARS_GRAVITY;
    const horizontalAcceleration =
      Math.sin(degreesToRadians(-currentState.rotation)) * currentState.thrust;

    // set new position
    newState.position = {
      x:
        currentState.position.x +
        currentState.velocity.horizontal +
        horizontalAcceleration / 2,
      y:
        currentState.position.y +
        currentState.velocity.vertical +
        verticalAcceleration / 2,
    };

    // set new velocity
    newState.velocity = {
      horizontal: currentState.velocity.horizontal + horizontalAcceleration,
      vertical: currentState.velocity.vertical + verticalAcceleration,
    };

    // set input rotation and thrust
    newState.rotation = newInput.rotation;
    newState.thrust = newInput.thrust;

    // render on svg the new position rotation and thrust
    renderTurn(
      currentState.position,
      currentState.rotation,
      currentState.thrust,
    );

    const collided = didCollideWithFloor(
      FLOOR_POINTS,
      currentState.position,
      newState.position,
    );

    return {
      collided,
      landedSuccesfully: false,
      newState,
    };
  };

  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomInput = (previousRotation: number): GameInput => ({
    rotation: previousRotation + randomInt(-15, 15),
    thrust: randomInt(0, 4),
  });

  const generateRandomRun = () => {
    const randomRun: GameInput[] = [];
    for (let i = 0; i < 100; i++) {
      randomRun.push(
        randomInput(i === 0 ? INITIAL_ROTATION : randomRun[i - 1].rotation),
      );
    }
    return randomRun;
  };

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

  const renderRun = (gameRun: GameRun) => {
    const runPolyline = createPolyline(gameRun.positions);
    svgElement.appendChild(runPolyline);
  };

  for (let i = 0; i < 50; i++) {
    console.log({ i });
    const gameRunPositions: Coordinate[] = [];
    let result;
    const randomRun = generateRandomRun();

    let currentState = {
      position: INITIAL_POSITION,
      velocity: INITIAL_VELOCITY,
      rotation: INITIAL_ROTATION,
      thrust: INITIAL_THRUST,
    };

    let turn = 0;
    while (!result || !result.collided) {
      console.log({ randomRun, turn });
      result = gameTurn(randomRun[turn], currentState);
      currentState = result.newState;
      gameRunPositions.push({ ...currentState.position });
      if (result.collided) {
        const gameRun: GameRun = {
          positions: gameRunPositions,
          finalPosition: result.newState.position,
          finalVelocity: result.newState.velocity,
        };
        renderRun(gameRun);
      } else {
        turn++;
      }
    }
    console.log({ i });
  }
};
marsLanderSimulator();
