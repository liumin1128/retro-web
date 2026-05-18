import { SeatFieldsFragment, UserFieldsFragment } from '@/generated/graphql';

export interface Info {
  status?: string;
  seat?: SeatFieldsFragment;
  workingDay?: boolean;
  comment?: string;
}

export interface RowItem extends UserFieldsFragment {
  isMe?: boolean;
  wfhDays: number;
  alDays: number;
  comment?: string;
  [key: string]: unknown;
}
