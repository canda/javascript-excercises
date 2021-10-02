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
    rotationChange: number;
  };

  type GameState = {
    position: Coordinate;
    velocity: Velocity;
    rotation: number;
    thrust: number;
  };

  type Gene = GameInput;
  type Chromosome = Gene[];
  type Population = Chromosome[];

  type ChromosomeResult = {
    positions: Coordinate[];
    finalPosition: Coordinate;
    finalVelocity: Velocity;
    usedFuel: number;
    score: number;
    chromosome: Chromosome;
  };

  type PopulationResult = {
    results: ChromosomeResult[];
    population: Population;
  };

  const GENETIC_CONFIG = {
    POPULATION_SIZE: 100,
    CHROMOSOME_SIZE: 100,
    SURVIVAL_PERCENTAGE: 0.1,
    PROBABILITY_OF_MUTATION: 0.01,
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

  const gameTurn = (newInput: GameInput, currentState: GameState) => {
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
    newState.rotation = newInput.rotationChange + currentState.rotation;
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

  const generateRandomChromosome = () => {
    const randomRun: Chromosome = [];
    for (let i = 0; i < GENETIC_CONFIG.CHROMOSOME_SIZE; i++) {
      randomRun.push({
        rotationChange: randomInt(-15, 15),
        thrust: randomInt(0, 4),
      });
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

  const chromosomeResultsContainer = document.querySelector(
    '#chromosome-results',
  );
  const renderResult = (result: ChromosomeResult) => {
    const runPolyline = createPolyline(result.positions);
    chromosomeResultsContainer.appendChild(runPolyline);
    return runPolyline;
  };

  const findFloorTarget = (floor: Coordinate[]) => {
    const firstTargetIndex = floor.findIndex(
      (point, index) => point.y === floor[index + 1].y,
    );

    const point1 = floor[firstTargetIndex];
    const point2 = floor[firstTargetIndex + 1];

    return { x: (point1.x + point2.x) / 2, y: point1.y };
  };

  const floorTarget = findFloorTarget(FLOOR_POINTS);

  const distance = (p1: Coordinate, p2: Coordinate) =>
    Math.hypot(p1.x - p2.x, p1.y - p2.y);

  const chromosomeResultScore = (gameRun: {
    finalVelocity: Velocity;
    finalPosition: Coordinate;
    usedFuel: number;
  }) => {
    // Each point should be a number between 0 and 1
    // Then we will multiply them by an arbitrary preponderance number
    // 1 is bad, 0 is good
    const distancePoints = distance(gameRun.finalPosition, floorTarget) / 7000;

    const velocityPoints =
      Math.abs(gameRun.finalVelocity.vertical) > 40 ||
      Math.abs(gameRun.finalVelocity.vertical) > 20
        ? 1
        : 0;

    const fuelPoints = gameRun.usedFuel / 2000;

    const DISTANCE_PREPONDERANCE = 1;
    const VELOCITY_PREPONDERANCE = 1;
    const FUEL_PREPONDERANCE = 1;
    return (
      -DISTANCE_PREPONDERANCE * distancePoints -
      VELOCITY_PREPONDERANCE * velocityPoints -
      FUEL_PREPONDERANCE * fuelPoints
    );
  };

  const runChromosome = (gameInputs: Chromosome) => {
    let usedFuel = 0;
    let result;
    let turn = 0;
    let currentState = {
      position: INITIAL_POSITION,
      velocity: INITIAL_VELOCITY,
      rotation: INITIAL_ROTATION,
      thrust: INITIAL_THRUST,
    };
    const gameRunPositions: Coordinate[] = [];
    while (!result || !result.collided) {
      result = gameTurn(gameInputs[turn], currentState);
      usedFuel += result.newState.thrust;
      currentState = result.newState;
      gameRunPositions.push({ ...currentState.position });
      if (result.collided) {
        const finalPosition = result.newState.position;
        const finalVelocity = result.newState.velocity;
        const gameRun: ChromosomeResult = {
          positions: gameRunPositions,
          finalPosition,
          finalVelocity,
          usedFuel,
          score: chromosomeResultScore({
            finalPosition,
            finalVelocity,
            usedFuel,
          }),
          chromosome: gameInputs,
        };
        return gameRun;
      } else {
        turn++;
      }
    }
  };

  const runPopulation = (population: Population): PopulationResult => {
    const results: ChromosomeResult[] = [];
    population.forEach((chromosome) => {
      results.push(runChromosome(chromosome));
    });

    return {
      population,
      results,
    };
  };

  const renderPopulationResult = (populationResult: PopulationResult) => {
    const sortedRuns = populationResult.results.sort(
      (x, y) => y.score - x.score,
    );
    const chromosomeResultsToKeep = Math.round(
      GENETIC_CONFIG.POPULATION_SIZE * GENETIC_CONFIG.SURVIVAL_PERCENTAGE,
    );
    const failedRuns = sortedRuns.slice(
      chromosomeResultsToKeep,
      sortedRuns.length,
    );
    const succesfullRuns = sortedRuns.slice(0, chromosomeResultsToKeep);

    chromosomeResultsContainer.innerHTML = '';
    failedRuns.forEach((run) => {
      renderResult(run);
    });
    succesfullRuns.forEach((run) => {
      renderResult(run).setAttribute('stroke', 'green');
    });
  };

  const generateRandomPopulation = (): Population => {
    const population: Population = [];

    for (let i = 0; i < GENETIC_CONFIG.POPULATION_SIZE; i++) {
      const randomChromosome = generateRandomChromosome();
      population.push(randomChromosome);
    }

    return population;
  };

  const mergeGeneAttribute = (
    parentAttribute1: number,
    parentAttribute2: number,
  ): number => {
    const randomRatio = Math.random();
    return Math.round(
      parentAttribute1 * randomRatio + parentAttribute2 * (1 - randomRatio),
    );
  };

  const optimizePopulation = (
    originalPopulationResult: PopulationResult,
  ): Population => {
    const survivingChromosomeResults = originalPopulationResult.results.slice(
      0,
      Math.floor(
        GENETIC_CONFIG.POPULATION_SIZE * GENETIC_CONFIG.SURVIVAL_PERCENTAGE,
      ),
    );

    const population: Population = [];

    for (let i = 0; i < GENETIC_CONFIG.POPULATION_SIZE; i++) {
      const newChromosome: Chromosome = [];
      const parent1 =
        survivingChromosomeResults[
          randomInt(0, survivingChromosomeResults.length - 1)
        ];
      const parent2 =
        survivingChromosomeResults[
          randomInt(0, survivingChromosomeResults.length - 1)
        ];

      for (let j = 0; j < GENETIC_CONFIG.CHROMOSOME_SIZE; j++) {
        const newInput: Gene = {
          rotationChange: mergeGeneAttribute(
            parent1.chromosome[j].rotationChange,
            parent2.chromosome[j].rotationChange,
          ),
          thrust: mergeGeneAttribute(
            parent1.chromosome[j].thrust,
            parent2.chromosome[j].thrust,
          ),
        };
        newChromosome.push(newInput);
      }

      population.push(newChromosome);
    }

    return population;
  };

  let population = generateRandomPopulation();
  let populationResult = runPopulation(population);
  renderPopulationResult(populationResult);

  // setInterval(() => {
  //   population = optimizePopulation(populationResult);
  //   populationResult = runPopulation(population);

  //   renderPopulationResult(populationResult);
  // }, 500);
};
marsLanderSimulator();
