export interface Seat {
  id: number;
  direction: number;
  status: number;
  _id: string;
}

export interface User {
  _id: string;
  seatID?: number;
  avatarUrl?: string | null;
}
