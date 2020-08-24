import availableMeetingTime, { AvailableSlots } from './meeting-planner';

describe('availableMeetingTime', () => {
  it('should find available slots when available', () => {
    const slotsA: AvailableSlots = [
      [10, 50],
      [60, 120],
      [140, 210],
    ];
    const slotsB: AvailableSlots = [
      [0, 15],
      [60, 70],
    ];
    const duration = 8;
    expect(availableMeetingTime(slotsA, slotsB, duration)).toStrictEqual([
      60,
      68,
    ]);
  });
  it('should return an empty array when there is no available time', () => {
    const slotsA: AvailableSlots = [
      [10, 50],
      [60, 120],
      [140, 210],
    ];
    const slotsB: AvailableSlots = [
      [0, 15],
      [60, 70],
    ];
    const duration = 12;
    expect(availableMeetingTime(slotsA, slotsB, duration)).toStrictEqual([]);
  });
});
