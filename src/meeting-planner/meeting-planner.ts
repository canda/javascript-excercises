export type AvailableSlots = [number, number][];

const availableMeetingTime = (
  slotsA: AvailableSlots,
  slotsB: AvailableSlots,
  duration,
) => {
  let bIndex = 0;
  
  slotsA.forEach((aSlot) => {
    while (bIndex < slotsB.length) {
      const bSlot = slotsB[bIndex];
      if()
      bIndex++;
    }
  });
  slotsA;
  return [];
};

export default availableMeetingTime;
