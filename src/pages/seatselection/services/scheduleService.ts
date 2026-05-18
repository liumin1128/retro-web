import {
  CreateScheduleMutationFn,
  CreateScheduleMutationVariables,
  ToggleUserToSeatMutationFn,
  ToggleUserToSeatMutationVariables,
} from '@/generated/graphql';

export type ToggleScheduleArgs = CreateScheduleMutationVariables;
export type ToggleSeatArgs = ToggleUserToSeatMutationVariables;

export async function toggleSchedule(
  createSchedule: CreateScheduleMutationFn,
  variables: ToggleScheduleArgs,
): Promise<void> {
  await createSchedule({ variables });
}

export async function toggleSeat(
  toggleUserToSeat: ToggleUserToSeatMutationFn,
  variables: ToggleSeatArgs,
): Promise<void> {
  await toggleUserToSeat({ variables });
}
