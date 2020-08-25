const maxActivities = (map) => {
  let currentGroup = 0;
  const positionToGroupId = {};
  const groupPositions = {};

  const setNeighbors = (x, y) => {
    if (y < 0 || y >= map.length) {
      return;
    }
    if (x < 0 || x >= map[y].length) {
      return;
    }
    if (map[y][x] === 0) {
      return;
    }
    const key = `${x},${y}`;
    if (positionToGroupId[key]) {
      return;
    }

    positionToGroupId[key] = currentGroup;
    groupPositions[currentGroup] = groupPositions[currentGroup] || [];
    groupPositions[currentGroup].push(key);

    // down
    setNeighbors(x, y + 1);
    // up
    setNeighbors(x, y - 1);
    // right
    setNeighbors(x + 1, y);
    // left
    setNeighbors(x - 1, y);
  };

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (map[y][x] === 0) {
        continue;
      }
      const key = `${x},${y}`;
      // only check for neighbors if this position is not already in a group
      if (!positionToGroupId[key]) {
        currentGroup++;
        setNeighbors(x, y);
      }
    }
  }

  // count positions on each group and return the maximum count
  return Math.max(
    ...Object.keys(groupPositions).map((group) => groupPositions[group].length),
  );
};

export default maxActivities;
