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

  const INITIAL_POSITION: Coordinate = { x: 2500, y: 2700 };
  const INITIAL_VELOCITY = { horizontal: 0, vertical: 0 };
  const INITIAL_ROTATION = 0;

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

  let position = INITIAL_POSITION;
  let velocity = INITIAL_VELOCITY;
  let rotation = INITIAL_ROTATION;

  const rocketElement = document.querySelector('#rocket');
  const render = () => {
    rocketElement.setAttribute(
      'transform',
      `translate(${position.x},${position.y}) rotate(${rotation})`,
    );
  };
  render();

  // const loop = (newVelocity: { horizont }) => {};
};
marsLanderSimulator();
