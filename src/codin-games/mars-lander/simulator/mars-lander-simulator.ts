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

  type ChromosomeScore = {
    ponderedAverage: number;
    distanceScore: number;
    horizontalVelocityScore: number;
    verticalVelocityScore: number;
    fuelScore: number;
    rotationScore: number;
  };

  type ChromosomeResult = {
    positions: Coordinate[];
    usedFuel: number;
    score: {
      ponderedAverage: number;
    };
    chromosome: Chromosome;
    states: GameState[];
  };

  type PopulationResult = {
    results: ChromosomeResult[];
    population: Population;
  };

  const GENETIC_CONFIG = {
    POPULATION_SIZE: 100,
    CHROMOSOME_SIZE: 100,
    SURVIVAL_PERCENTAGE: 0.15,
    PROBABILITY_OF_MUTATION: 0.02,
    MAX_ITERATIONS: 30,
    ANIMATE: true,
    ANIMATION_VELOCITY: 10,
    DISTANCE_PREPONDERANCE: 100,
    VELOCITY_PREPONDERANCE: 10,
    FUEL_PREPONDERANCE: 1,
    ROTATION_PREPONDERANCE: 20,
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

    const left = floor[firstTargetIndex];
    const right = floor[firstTargetIndex + 1];

    return { center: { x: (left.x + right.x) / 2, y: left.y }, left, right };
  };

  const floorTarget = findFloorTarget(FLOOR_POINTS);

  const distance = (p1: Coordinate, p2: Coordinate) =>
    Math.hypot(p1.x - p2.x, p1.y - p2.y);

  const chromosomeResultScore = (
    states: GameState[],
    usedFuel: number,
  ): ChromosomeScore => {
    const lastState = states[states.length - 1];
    const lastState2 = states[states.length - 2];
    const lastState3 = states[states.length - 3];
    const lastState4 = states[states.length - 4];
    const lastState5 = states[states.length - 5];

    // Each point should be a number between 0 and 1
    // Then we will multiply them by an arbitrary preponderance number
    // 1 is good, 0 is bad
    let distanceScore =
      1 / (distance(lastState.position, floorTarget.center) / 5000 + 1);
    if (
      lastState.position.x > floorTarget.left.x + 400 &&
      lastState.position.x < floorTarget.right.x - 400 &&
      Math.abs(lastState.position.y - floorTarget.center.y) < 40
    ) {
      distanceScore = 1;
    }

    let velocityScore =
      -Math.abs(lastState.velocity.vertical) / 25 -
      Math.abs(lastState.velocity.horizontal) / 25;
    if (
      Math.abs(lastState.velocity.vertical) < 35 &&
      Math.abs(lastState.velocity.horizontal) < 15
    ) {
      velocityScore = 1;
    }

    const horizontalVelocityScore =
      Math.abs(lastState.velocity.horizontal) < 15
        ? 1
        : 1 - Math.abs(lastState.velocity.horizontal) / 25;

    // const fuelScore = 1 - 1 / usedFuel;
    const fuelScore = 1;

    const rotationScore =
      1 /
      (Math.abs(lastState.rotation) +
        Math.abs(lastState2.rotation) +
        Math.abs(lastState3.rotation) +
        Math.abs(lastState4.rotation) +
        Math.abs(lastState5.rotation) +
        1);

    return {
      ponderedAverage:
        GENETIC_CONFIG.DISTANCE_PREPONDERANCE * distanceScore +
        GENETIC_CONFIG.VELOCITY_PREPONDERANCE * velocityScore +
        GENETIC_CONFIG.FUEL_PREPONDERANCE * fuelScore +
        GENETIC_CONFIG.ROTATION_PREPONDERANCE * rotationScore,
      distanceScore,
      velocityScore,
      fuelScore,
      rotationScore,
    };
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
    const states: GameState[] = [currentState];
    const gameRunPositions: Coordinate[] = [];
    while (
      (!result || !result.collided) &&
      turn < GENETIC_CONFIG.CHROMOSOME_SIZE
    ) {
      result = gameTurn(gameInputs[turn], currentState);
      usedFuel += result.newState.thrust;
      currentState = result.newState;
      states.push(currentState);
      gameRunPositions.push({ ...currentState.position });
      if (result.collided || turn === GENETIC_CONFIG.CHROMOSOME_SIZE - 1) {
        const gameRun: ChromosomeResult = {
          positions: gameRunPositions,
          usedFuel,
          score: chromosomeResultScore(states, usedFuel),
          chromosome: gameInputs,
          states,
        };
        return gameRun;
      }
      turn++;
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
      (x, y) => y.score.ponderedAverage - x.score.ponderedAverage,
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
    const bestRun = sortedRuns[0];
    const bestRunPolyline = renderResult(bestRun);
    bestRunPolyline.setAttribute('stroke', 'blue');
    bestRunPolyline.setAttribute('stroke-width', '60');
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
    min: number,
    max: number,
  ): number => {
    const shouldMutate = Math.random() < GENETIC_CONFIG.PROBABILITY_OF_MUTATION;

    if (shouldMutate) {
      return randomInt(min, max);
    }

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
            -15,
            15,
          ),
          thrust: mergeGeneAttribute(
            parent1.chromosome[j].thrust,
            parent2.chromosome[j].thrust,
            0,
            4,
          ),
        };
        newChromosome.push(newInput);
      }

      population.push(newChromosome);
    }

    return population;
  };

  const savePopulationToLocalStorage = (population: Population) => {
    localStorage.setItem('mars-lander-population', JSON.stringify(population));
  };

  const getPopulationFromLocalStorage = (): Population => {
    const populationString = localStorage.getItem('mars-lander-population');
    return populationString ? JSON.parse(populationString) : null;
  };

  let population =
    getPopulationFromLocalStorage() ?? generateRandomPopulation();
  let populationResult = runPopulation(population);
  renderPopulationResult(populationResult);

  const delay = (milis: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, milis);
    });

  const loopAndOptimize = async () => {
    let best: ChromosomeResult;
    for (let i = 0; i < GENETIC_CONFIG.MAX_ITERATIONS - 1; i++) {
      if (GENETIC_CONFIG.ANIMATE) {
        await delay(400 / GENETIC_CONFIG.ANIMATION_VELOCITY);
      }
      population = optimizePopulation(populationResult);
      savePopulationToLocalStorage(population);
      populationResult = runPopulation(population);

      if (GENETIC_CONFIG.ANIMATE) {
        renderPopulationResult(populationResult);
      }

      const sortedResults = populationResult.results.sort(
        (x, y) => y.score.ponderedAverage - x.score.ponderedAverage,
      );
      best = sortedResults[0];
      console.log(best.score);

      if ((window as any).logBest) {
        (window as any).logBest = false;
        console.log(best);
        console.log(best.score);
        console.log(best.states[best.states.length - 1]);
      }
      // console.log(best.score.ponderedAverage);
      if (best.score.ponderedAverage === 4) {
        console.log({ best });
      }
    }

    renderPopulationResult(populationResult);

    console.log(best);
    console.log(best.score);
    console.log(best.states[best.states.length - 1]);
    console.log(JSON.stringify(best.chromosome));
  };
  loopAndOptimize();
};
marsLanderSimulator();
