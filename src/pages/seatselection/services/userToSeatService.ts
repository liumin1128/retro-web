import {
  CreateUserToSeatMutationFn,
  DeleteUserToSeatMutationFn,
} from '@/generated/graphql';

export async function createUserToSeat(
  createSeatSelection: CreateUserToSeatMutationFn,
  seat: string,
  date: number,
): Promise<void> {
  await createSeatSelection({ variables: { seat, date } });
}

export async function deleteUserToSeat(
  deleteSeatSelection: DeleteUserToSeatMutationFn,
  seat: string,
  date: number,
): Promise<void> {
  await deleteSeatSelection({ variables: { seat, date } });
}
