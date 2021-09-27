const marsLanderSimulator = () => {
  type Coordinate = {
    x: number;
    y: number;
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
  floorPolyline.setAttribute('stroke-width', '20');
  floorPolyline.setAttribute('fill', 'none');
  svgElement.appendChild(floorPolyline);
};
marsLanderSimulator();
