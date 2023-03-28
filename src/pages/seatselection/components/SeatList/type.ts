export interface Seat {
  id: number;
  direction: number;
  status: number;
  _id: string;
}

export interface User {
  _id: number;
  seatID: number;
  avatarUrl: string;
}
