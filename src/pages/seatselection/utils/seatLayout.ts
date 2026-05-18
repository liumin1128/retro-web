import list from '@/pages/seatselection/components/SeatList/seatData';

export const seatIds = list.flatMap((line) => {
  return line.list.flatMap((section) => {
    return section.seats.map((seat) => seat._id);
  });
});

export function getSeatIdByDisplayIndex(index: number): string | undefined {
  return seatIds[index - 1];
}
