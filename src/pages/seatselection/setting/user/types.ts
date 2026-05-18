import {
  AdminUpdateUserInfoInput,
  UserFieldsFragment,
} from '@/generated/graphql';

export interface AddUserValues {
  users: UserFieldsFragment[];
  tags: string[];
}

export type UpdateUserValues = AdminUpdateUserInfoInput;
