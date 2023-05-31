import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Comment = Document & {
  __typename?: 'Comment';
  _id: Scalars['ID'];
  comments?: Maybe<Array<Maybe<Reply>>>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  likeCount?: Maybe<Scalars['Int']>;
  likeStatus?: Maybe<Scalars['Boolean']>;
  object?: Maybe<Scalars['ID']>;
  objectModel?: Maybe<CommentObjectUnionModel>;
  objectUnion?: Maybe<CommentObjectUnion>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CommentObjectUnion = Comment | News | RetroMessage;

export enum CommentObjectUnionModel {
  Comment = 'Comment',
  Dynamic = 'Dynamic',
  News = 'News',
  RetroMessage = 'RetroMessage'
}

export type CreateCommentInput = {
  content?: InputMaybe<Scalars['String']>;
  object: Scalars['ID'];
  objectModel: CommentObjectUnionModel;
};

export type CreateDynamicInput = {
  content?: InputMaybe<Scalars['String']>;
  pictures?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateFollowInput = {
  to: Scalars['ID'];
};

export type CreateHashtagInput = {
  category?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateInterestInput = {
  category?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateLikeInput = {
  object: Scalars['ID'];
  objectModel: LikeObjectUnionModel;
};

export type CreateNewsInput = {
  age?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateOAuthInput = {
  age?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateOrganizationInput = {
  description?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateRetroInput = {
  anonymous?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateRetroMessageInput = {
  anonymous?: InputMaybe<Scalars['Boolean']>;
  content: Scalars['String'];
  pictures?: InputMaybe<Array<Scalars['String']>>;
  retro: Scalars['ID'];
  type: RetroMessageType;
};

export type CreateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  scope: Scalars['String'];
};

export type CreateScheduleInput = {
  date: Scalars['Float'];
  status: Scalars['String'];
  user?: InputMaybe<Scalars['ID']>;
};

export type CreateSeatInput = {
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type CreateTopicInput = {
  category?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  icon?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['Int']>;
};

export type CreateUserToRoleInput = {
  role: Scalars['ID'];
  scope: Scalars['String'];
  user: Scalars['ID'];
};

export type CreateUserToSeatInput = {
  date?: InputMaybe<Scalars['Float']>;
  seat?: InputMaybe<Scalars['ID']>;
};

export type DeleteUserToSeatInput = {
  date?: InputMaybe<Scalars['Float']>;
  seat?: InputMaybe<Scalars['ID']>;
};

export type Document = {
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Dynamic = Document & {
  __typename?: 'Dynamic';
  _id: Scalars['ID'];
  commentCount?: Maybe<Scalars['Int']>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  likeCount?: Maybe<Scalars['Int']>;
  likeStatus?: Maybe<Scalars['Boolean']>;
  pictures?: Maybe<Array<Scalars['String']>>;
  shareCount?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
  user: User;
};

export type Follow = Document & {
  __typename?: 'Follow';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  from?: Maybe<User>;
  to?: Maybe<User>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Hashtag = Document & {
  __typename?: 'Hashtag';
  _id: Scalars['ID'];
  category?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Interest = Document & {
  __typename?: 'Interest';
  _id: Scalars['ID'];
  category?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Like = Document & {
  __typename?: 'Like';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  object?: Maybe<Scalars['ID']>;
  objectModel?: Maybe<LikeObjectUnionModel>;
  objectUnion?: Maybe<LikeObjectUnion>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LikeObjectUnion = Comment | Dynamic | News | RetroMessage;

export enum LikeObjectUnionModel {
  Comment = 'Comment',
  Dynamic = 'Dynamic',
  News = 'News',
  RetroMessage = 'RetroMessage'
}

export type LoginUserInput = {
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminPullUsersTags?: Maybe<Result>;
  adminPushUsersTags?: Maybe<Result>;
  createComment?: Maybe<Comment>;
  createDynamic?: Maybe<Dynamic>;
  createFollow?: Maybe<Follow>;
  createHashtag?: Maybe<Hashtag>;
  createInterest?: Maybe<Interest>;
  createLike?: Maybe<Like>;
  createNews?: Maybe<News>;
  createOAuth?: Maybe<OAuth>;
  createOrganization?: Maybe<Organization>;
  createRetro?: Maybe<Retro>;
  createRetroMessage?: Maybe<RetroMessage>;
  createRole?: Maybe<UserRole>;
  createSchedule?: Maybe<Schedule>;
  createSeat?: Maybe<Seat>;
  createTopic?: Maybe<Topic>;
  createUser?: Maybe<User>;
  createUserToRole?: Maybe<UserToRole>;
  createUserToSeat?: Maybe<UserToSeat>;
  deleteRetroMessage?: Maybe<RetroMessage>;
  deleteUserToSeat?: Maybe<UserToSeat>;
  likeRetroMessage?: Maybe<RetroMessage>;
  organizationInviteUser?: Maybe<UserToOrganization>;
  organizationRemoveUser?: Maybe<UserToOrganization>;
  pullSeatsTags?: Maybe<Result>;
  pushSeatsTags?: Maybe<Result>;
  register?: Maybe<User>;
  replyComment?: Maybe<Reply>;
  setSeatsTags?: Maybe<Result>;
  toggleUserToSeat?: Maybe<UserToSeat>;
  updateRetroMessage?: Maybe<RetroMessage>;
  updateSeat?: Maybe<Result>;
  updateUserInfo?: Maybe<User>;
};


export type MutationAdminPullUsersTagsArgs = {
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationAdminPushUsersTagsArgs = {
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationCreateCommentArgs = {
  input?: InputMaybe<CreateCommentInput>;
};


export type MutationCreateDynamicArgs = {
  input?: InputMaybe<CreateDynamicInput>;
};


export type MutationCreateFollowArgs = {
  input?: InputMaybe<CreateFollowInput>;
};


export type MutationCreateHashtagArgs = {
  input?: InputMaybe<CreateHashtagInput>;
};


export type MutationCreateInterestArgs = {
  input?: InputMaybe<CreateInterestInput>;
};


export type MutationCreateLikeArgs = {
  input?: InputMaybe<CreateLikeInput>;
};


export type MutationCreateNewsArgs = {
  createNewsInput?: InputMaybe<CreateNewsInput>;
};


export type MutationCreateOAuthArgs = {
  createOAuthInput?: InputMaybe<CreateOAuthInput>;
};


export type MutationCreateOrganizationArgs = {
  input?: InputMaybe<CreateOrganizationInput>;
};


export type MutationCreateRetroArgs = {
  input?: InputMaybe<CreateRetroInput>;
};


export type MutationCreateRetroMessageArgs = {
  input?: InputMaybe<CreateRetroMessageInput>;
};


export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};


export type MutationCreateScheduleArgs = {
  input?: InputMaybe<CreateScheduleInput>;
};


export type MutationCreateSeatArgs = {
  input?: InputMaybe<CreateSeatInput>;
};


export type MutationCreateTopicArgs = {
  input?: InputMaybe<CreateTopicInput>;
};


export type MutationCreateUserArgs = {
  createUserInput?: InputMaybe<CreateUserInput>;
};


export type MutationCreateUserToRoleArgs = {
  input?: InputMaybe<CreateUserToRoleInput>;
};


export type MutationCreateUserToSeatArgs = {
  input?: InputMaybe<CreateUserToSeatInput>;
};


export type MutationDeleteRetroMessageArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeleteUserToSeatArgs = {
  input?: InputMaybe<DeleteUserToSeatInput>;
};


export type MutationLikeRetroMessageArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  count?: InputMaybe<Scalars['Int']>;
};


export type MutationOrganizationInviteUserArgs = {
  input?: InputMaybe<OrganizationInviteUserInput>;
};


export type MutationOrganizationRemoveUserArgs = {
  input?: InputMaybe<OrganizationRemoveUserInput>;
};


export type MutationPullSeatsTagsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationPushSeatsTagsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterUserInput>;
};


export type MutationReplyCommentArgs = {
  input?: InputMaybe<ReplyCommentInput>;
};


export type MutationSetSeatsTagsArgs = {
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationToggleUserToSeatArgs = {
  input?: InputMaybe<ToggleUserToSeatInput>;
};


export type MutationUpdateRetroMessageArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<UpdateRetroMessageInput>;
};


export type MutationUpdateSeatArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<UpdateSeatInput>;
};


export type MutationUpdateUserInfoArgs = {
  input?: InputMaybe<UpdateUserInfoInput>;
};

export type News = {
  __typename?: 'News';
  _id: Scalars['ID'];
  cover?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type OAuth = {
  __typename?: 'OAuth';
  _id: Scalars['ID'];
  platform?: Maybe<Scalars['String']>;
};

export type Organization = Document & {
  __typename?: 'Organization';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  owner: User;
  updatedAt?: Maybe<Scalars['String']>;
};

export type OrganizationInviteUserInput = {
  organization: Scalars['ID'];
  user: Scalars['ID'];
};

export type OrganizationRemoveUserInput = {
  organization: Scalars['ID'];
  user: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  currentOrganization?: Maybe<Organization>;
  currentOrganizationUsers?: Maybe<Array<Maybe<User>>>;
  findComment?: Maybe<Comment>;
  findComments?: Maybe<Array<Maybe<Comment>>>;
  findDynamic?: Maybe<Dynamic>;
  findDynamics?: Maybe<Array<Maybe<Dynamic>>>;
  findFollow?: Maybe<Follow>;
  findFollows?: Maybe<Array<Maybe<Follow>>>;
  findHashtag?: Maybe<Hashtag>;
  findHashtags?: Maybe<Array<Maybe<Hashtag>>>;
  findInterest?: Maybe<Interest>;
  findInterests?: Maybe<Array<Maybe<Interest>>>;
  findLike?: Maybe<Like>;
  findLikes?: Maybe<Array<Maybe<Like>>>;
  findOrganization?: Maybe<Organization>;
  findOrganizations?: Maybe<Array<Maybe<Organization>>>;
  findRetro?: Maybe<Retro>;
  findRetroMessage?: Maybe<RetroMessage>;
  findRetroMessages?: Maybe<Array<Maybe<RetroMessage>>>;
  findRetros?: Maybe<Array<Maybe<RetroListItem>>>;
  findRole?: Maybe<UserRole>;
  findRoles?: Maybe<Array<Maybe<UserRole>>>;
  findSchedule?: Maybe<Schedule>;
  findSchedules?: Maybe<Array<Maybe<Schedule>>>;
  findSeat?: Maybe<Seat>;
  findSeatSelectionUsers?: Maybe<Array<Maybe<UserWithRole>>>;
  findSeats?: Maybe<Array<Maybe<Seat>>>;
  findTopic?: Maybe<Topic>;
  findTopics?: Maybe<Array<Maybe<Topic>>>;
  findUser?: Maybe<User>;
  findUserInfo?: Maybe<User>;
  findUserToRole?: Maybe<UserToRole>;
  findUserToRoles?: Maybe<Array<Maybe<UserToRole>>>;
  findUserToSeat?: Maybe<UserToSeat>;
  findUserToSeats?: Maybe<Array<Maybe<UserToSeat>>>;
  findUsers?: Maybe<Array<Maybe<User>>>;
  login?: Maybe<UserWithToken>;
  myOrganizations?: Maybe<Array<Maybe<Organization>>>;
  news?: Maybe<News>;
  newsList?: Maybe<Array<Maybe<News>>>;
  oauth?: Maybe<OAuth>;
  oauths?: Maybe<Array<Maybe<OAuth>>>;
  userToOrganization?: Maybe<UserToOrganization>;
  userToOrganizations?: Maybe<Array<Maybe<UserToOrganization>>>;
};


export type QueryFindCommentArgs = {
  _id: Scalars['ID'];
};


export type QueryFindCommentsArgs = {
  object: Scalars['ID'];
};


export type QueryFindDynamicArgs = {
  _id: Scalars['ID'];
};


export type QueryFindFollowArgs = {
  _id: Scalars['ID'];
};


export type QueryFindHashtagArgs = {
  _id: Scalars['ID'];
};


export type QueryFindInterestArgs = {
  _id: Scalars['ID'];
};


export type QueryFindLikeArgs = {
  _id: Scalars['ID'];
};


export type QueryFindLikesArgs = {
  object: Scalars['ID'];
};


export type QueryFindOrganizationArgs = {
  _id: Scalars['ID'];
};


export type QueryFindRetroArgs = {
  _id: Scalars['ID'];
};


export type QueryFindRetroMessageArgs = {
  _id: Scalars['ID'];
};


export type QueryFindRetroMessagesArgs = {
  retro?: InputMaybe<Scalars['ID']>;
};


export type QueryFindRetrosArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
};


export type QueryFindRoleArgs = {
  _id: Scalars['ID'];
};


export type QueryFindScheduleArgs = {
  _id: Scalars['ID'];
};


export type QueryFindSchedulesArgs = {
  endDate?: InputMaybe<Scalars['Float']>;
  startDate?: InputMaybe<Scalars['Float']>;
  user?: InputMaybe<Scalars['ID']>;
};


export type QueryFindSeatArgs = {
  _id: Scalars['ID'];
};


export type QueryFindSeatSelectionUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['ID']>;
  skip?: InputMaybe<Scalars['Int']>;
  user?: InputMaybe<Scalars['ID']>;
};


export type QueryFindTopicArgs = {
  _id: Scalars['ID'];
};


export type QueryFindUserArgs = {
  _id: Scalars['String'];
};


export type QueryFindUserToRoleArgs = {
  _id: Scalars['ID'];
};


export type QueryFindUserToSeatArgs = {
  _id: Scalars['ID'];
};


export type QueryFindUserToSeatsArgs = {
  endDate?: InputMaybe<Scalars['Float']>;
  seat?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Float']>;
  user?: InputMaybe<Scalars['ID']>;
};


export type QueryFindUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryLoginArgs = {
  input?: InputMaybe<LoginUserInput>;
};


export type QueryNewsArgs = {
  _id: Scalars['ID'];
};


export type QueryOauthArgs = {
  _id: Scalars['ID'];
};


export type QueryUserToOrganizationArgs = {
  _id: Scalars['ID'];
};


export type QueryUserToOrganizationsArgs = {
  organization?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
};

export type RegisterUserInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['Int']>;
  sign?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};

export type Reply = {
  __typename?: 'Reply';
  _id: Scalars['ID'];
  commentTo?: Maybe<Comment>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  likeCount?: Maybe<Scalars['Int']>;
  likeStatus?: Maybe<Scalars['Boolean']>;
  object?: Maybe<Scalars['ID']>;
  objectModel?: Maybe<CommentObjectUnionModel>;
  objectUnion?: Maybe<CommentObjectUnion>;
  replyTo?: Maybe<Comment>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type ReplyCommentInput = {
  content?: InputMaybe<Scalars['String']>;
  to: Scalars['ID'];
};

export type Result = {
  __typename?: 'Result';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Retro = Document & {
  __typename?: 'Retro';
  _id: Scalars['ID'];
  anonymous?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type RetroListItem = Document & {
  __typename?: 'RetroListItem';
  _id: Scalars['ID'];
  anonymous?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  happyCount?: Maybe<Scalars['Int']>;
  likeCount?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  todoCount?: Maybe<Scalars['Int']>;
  unhappyCount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  wonderringCount?: Maybe<Scalars['Int']>;
};

export type RetroMessage = Document & {
  __typename?: 'RetroMessage';
  _id: Scalars['ID'];
  anonymous?: Maybe<Scalars['Boolean']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  like?: Maybe<Scalars['Int']>;
  pictures?: Maybe<Array<Scalars['String']>>;
  status?: Maybe<RetroMessageStatus>;
  type?: Maybe<RetroMessageType>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export enum RetroMessageStatus {
  Closed = 'CLOSED',
  Focused = 'FOCUSED',
  Normal = 'NORMAL'
}

export enum RetroMessageType {
  Happy = 'HAPPY',
  Todo = 'TODO',
  Unhappy = 'UNHAPPY',
  Wonderring = 'WONDERRING'
}

export enum Role {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  Unknown = 'UNKNOWN',
  User = 'USER'
}

export type Schedule = Document & {
  __typename?: 'Schedule';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Seat = Document & {
  __typename?: 'Seat';
  _id: Scalars['ID'];
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  disabled?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  commentCreated?: Maybe<Comment>;
  dynamicCreated?: Maybe<Dynamic>;
  followCreated?: Maybe<Follow>;
  hashtagCreated?: Maybe<Hashtag>;
  interestCreated?: Maybe<Interest>;
  likeCreated?: Maybe<Like>;
  newsCreated?: Maybe<News>;
  organizationCreated?: Maybe<Organization>;
  retroCreated?: Maybe<Retro>;
  retroMessageCreated?: Maybe<RetroMessage>;
  retroMessageDeleted?: Maybe<RetroMessage>;
  retroMessageLiked?: Maybe<RetroMessage>;
  retroMessageUpdated?: Maybe<RetroMessage>;
  roleCreated?: Maybe<UserRole>;
  scheduleCreated?: Maybe<Schedule>;
  seatCreated?: Maybe<Seat>;
  topicCreated?: Maybe<Topic>;
  userToOrganizationCreated?: Maybe<UserToOrganization>;
  userToRoleCreated?: Maybe<UserToRole>;
  userToSeatCreated?: Maybe<UserToSeat>;
  userToSeatDeleted?: Maybe<UserToSeat>;
};

export type ToggleUserToSeatInput = {
  date: Scalars['Float'];
  seat: Scalars['ID'];
  user: Scalars['ID'];
};

export type Topic = Document & {
  __typename?: 'Topic';
  _id: Scalars['ID'];
  category?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UpdateRetroMessageInput = {
  anonymous?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  pictures?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<RetroMessageStatus>;
  type?: InputMaybe<RetroMessageType>;
};

export type UpdateSeatInput = {
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateUserInfoInput = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  birthday?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  sex?: InputMaybe<Scalars['Int']>;
  sign?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatarUrl?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['Int']>;
  sign?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserRole = Document & {
  __typename?: 'UserRole';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  scope: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type UserToOrganization = Document & {
  __typename?: 'UserToOrganization';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  isCurrent?: Maybe<Scalars['Boolean']>;
  organization: Organization;
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};

export type UserToRole = Document & {
  __typename?: 'UserToRole';
  _id: Scalars['ID'];
  createdAt?: Maybe<Scalars['String']>;
  role: UserRole;
  scope: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
};

export type UserToSeat = Document & {
  __typename?: 'UserToSeat';
  _id: Scalars['ID'];
  cancel?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['Float']>;
  seat?: Maybe<Seat>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type UserWithRole = {
  __typename?: 'UserWithRole';
  _id: Scalars['ID'];
  avatarUrl?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  username?: Maybe<Scalars['String']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token: Scalars['String'];
  user: User;
};

export type CommentFieldsFragment = { __typename?: 'Comment', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, comments?: Array<{ __typename?: 'Reply', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, commentTo?: { __typename?: 'Comment', _id: string } | null, replyTo?: { __typename?: 'Comment', _id: string, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null } | null> | null };

export type ReplyFieldsFragment = { __typename?: 'Reply', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, commentTo?: { __typename?: 'Comment', _id: string } | null, replyTo?: { __typename?: 'Comment', _id: string, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type FindCommentsQueryVariables = Exact<{
  object: Scalars['ID'];
}>;


export type FindCommentsQuery = { __typename?: 'Query', findComments?: Array<{ __typename?: 'Comment', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, comments?: Array<{ __typename?: 'Reply', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, commentTo?: { __typename?: 'Comment', _id: string } | null, replyTo?: { __typename?: 'Comment', _id: string, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null } | null> | null } | null> | null };

export type FindCommentQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindCommentQuery = { __typename?: 'Query', findComment?: { __typename?: 'Comment', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, comments?: Array<{ __typename?: 'Reply', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, commentTo?: { __typename?: 'Comment', _id: string } | null, replyTo?: { __typename?: 'Comment', _id: string, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null } | null> | null } | null };

export type CreateCommentMutationVariables = Exact<{
  object: Scalars['ID'];
  objectModel: CommentObjectUnionModel;
  content: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment?: { __typename?: 'Comment', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, comments?: Array<{ __typename?: 'Reply', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, commentTo?: { __typename?: 'Comment', _id: string } | null, replyTo?: { __typename?: 'Comment', _id: string, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null } | null> | null } | null };

export type ReplyCommentMutationVariables = Exact<{
  to: Scalars['ID'];
  content: Scalars['String'];
}>;


export type ReplyCommentMutation = { __typename?: 'Mutation', replyComment?: { __typename?: 'Reply', _id: string, content?: string | null, createdAt?: string | null, likeCount?: number | null, likeStatus?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null, commentTo?: { __typename?: 'Comment', _id: string } | null, replyTo?: { __typename?: 'Comment', _id: string, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type DynamicFieldsFragment = { __typename?: 'Dynamic', _id: string, createdAt: string, content?: string | null, pictures?: Array<string> | null, likeCount?: number | null, likeStatus?: boolean | null, commentCount?: number | null, shareCount?: number | null, user: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } };

export type FindDynamicsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindDynamicsQuery = { __typename?: 'Query', findDynamics?: Array<{ __typename?: 'Dynamic', _id: string, createdAt: string, content?: string | null, pictures?: Array<string> | null, likeCount?: number | null, likeStatus?: boolean | null, commentCount?: number | null, shareCount?: number | null, user: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } } | null> | null };

export type FindDynamicQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindDynamicQuery = { __typename?: 'Query', findDynamic?: { __typename?: 'Dynamic', _id: string, createdAt: string, content?: string | null, pictures?: Array<string> | null, likeCount?: number | null, likeStatus?: boolean | null, commentCount?: number | null, shareCount?: number | null, user: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } } | null };

export type CreateDynamicMutationVariables = Exact<{
  content: Scalars['String'];
  pictures?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type CreateDynamicMutation = { __typename?: 'Mutation', createDynamic?: { __typename?: 'Dynamic', _id: string, createdAt: string, content?: string | null, pictures?: Array<string> | null, likeCount?: number | null, likeStatus?: boolean | null, commentCount?: number | null, shareCount?: number | null, user: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } } | null };

export type LikeFieldsFragment = { __typename?: 'Like', _id: string };

export type FindLikesQueryVariables = Exact<{
  object: Scalars['ID'];
}>;


export type FindLikesQuery = { __typename?: 'Query', findLikes?: Array<{ __typename?: 'Like', _id: string } | null> | null };

export type FindLikeQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindLikeQuery = { __typename?: 'Query', findLike?: { __typename?: 'Like', _id: string } | null };

export type CreateLikeMutationVariables = Exact<{
  object: Scalars['ID'];
  objectModel: LikeObjectUnionModel;
}>;


export type CreateLikeMutation = { __typename?: 'Mutation', createLike?: { __typename?: 'Like', _id: string } | null };

export type OrganizationFieldsFragment = { __typename?: 'Organization', _id: string, name?: string | null, description?: string | null, logo?: string | null };

export type FindOrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindOrganizationsQuery = { __typename?: 'Query', currentOrganization?: { __typename?: 'Organization', _id: string, name?: string | null, description?: string | null, logo?: string | null } | null, myOrganizations?: Array<{ __typename?: 'Organization', _id: string, name?: string | null, description?: string | null, logo?: string | null } | null> | null, currentOrganizationUsers?: Array<{ __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null> | null };

export type FindOrganizationQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindOrganizationQuery = { __typename?: 'Query', item?: { __typename?: 'Organization', _id: string, name?: string | null, description?: string | null, logo?: string | null } | null };

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  logo: Scalars['String'];
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization?: { __typename?: 'Organization', _id: string, name?: string | null, description?: string | null, logo?: string | null } | null };

export type RetroFieldsFragment = { __typename: 'Retro', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null };

export type RetroListItemFieldsFragment = { __typename: 'RetroListItem', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, likeCount?: number | null, happyCount?: number | null, unhappyCount?: number | null, wonderringCount?: number | null, todoCount?: number | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, avatarUrl?: string | null } | null };

export type FindRetrosQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
}>;


export type FindRetrosQuery = { __typename?: 'Query', findRetros?: Array<{ __typename: 'RetroListItem', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, likeCount?: number | null, happyCount?: number | null, unhappyCount?: number | null, wonderringCount?: number | null, todoCount?: number | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, avatarUrl?: string | null } | null } | null> | null };

export type FindRetroQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindRetroQuery = { __typename?: 'Query', findRetro?: { __typename: 'Retro', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type CreateRetroMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  anonymous?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateRetroMutation = { __typename?: 'Mutation', createRetro?: { __typename: 'Retro', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type RetroCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RetroCreatedSubscription = { __typename?: 'Subscription', retroCreated?: { __typename: 'Retro', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type RetroMessageFieldsFragment = { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null };

export type FindRetroSectionQueryVariables = Exact<{
  retro: Scalars['ID'];
}>;


export type FindRetroSectionQuery = { __typename?: 'Query', retroMessages?: Array<{ __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null> | null, retro?: { __typename: 'Retro', _id: string, title?: string | null, content?: string | null, date?: string | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null, userInfo?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null };

export type FindRetroMessagesQueryVariables = Exact<{
  retro: Scalars['ID'];
}>;


export type FindRetroMessagesQuery = { __typename?: 'Query', retroMessages?: Array<{ __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null> | null };

export type FindRetroMessageQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindRetroMessageQuery = { __typename?: 'Query', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type CreateRetroMessageMutationVariables = Exact<{
  retro: Scalars['ID'];
  content: Scalars['String'];
  type: RetroMessageType;
  pictures?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  anonymous?: InputMaybe<Scalars['Boolean']>;
}>;


export type CreateRetroMessageMutation = { __typename?: 'Mutation', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type UpdateRetroMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<RetroMessageType>;
  status?: InputMaybe<RetroMessageStatus>;
  pictures?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  anonymous?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateRetroMessageMutation = { __typename?: 'Mutation', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type LikeRetroMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
  count?: InputMaybe<Scalars['Int']>;
}>;


export type LikeRetroMessageMutation = { __typename?: 'Mutation', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type DeleteRetroMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type DeleteRetroMessageMutation = { __typename?: 'Mutation', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type RetroMessageCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RetroMessageCreatedSubscription = { __typename?: 'Subscription', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type RetroMessageUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RetroMessageUpdatedSubscription = { __typename?: 'Subscription', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type RetroMessageLikedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RetroMessageLikedSubscription = { __typename?: 'Subscription', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type RetroMessageDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RetroMessageDeletedSubscription = { __typename?: 'Subscription', retroMessage?: { __typename?: 'RetroMessage', _id: string, content?: string | null, status?: RetroMessageStatus | null, type?: RetroMessageType | null, like?: number | null, createdAt?: string | null, updatedAt?: string | null, pictures?: Array<string> | null, anonymous?: boolean | null, user?: { __typename?: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type UserRoleFieldsFragment = { __typename?: 'UserRole', _id: string, name: string, scope: string, description?: string | null };

export type UserToRoleFieldsFragment = { __typename?: 'UserToRole', _id: string, createdAt?: string | null, role: { __typename?: 'UserRole', _id: string, name: string, scope: string, description?: string | null }, user: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } };

export type UserWithRoleFieldsFragment = { __typename?: 'UserWithRole', _id: string, username?: string | null, nickname?: string | null, avatarUrl?: string | null, roles?: Array<{ __typename?: 'UserRole', _id: string, name: string, scope: string, description?: string | null } | null> | null };

export type FindRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRolesQuery = { __typename?: 'Query', findRoles?: Array<{ __typename?: 'UserRole', _id: string, name: string, scope: string, description?: string | null } | null> | null };

export type FindSeatSelectionUsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
}>;


export type FindSeatSelectionUsersQuery = { __typename?: 'Query', list?: Array<{ __typename?: 'UserWithRole', _id: string, username?: string | null, nickname?: string | null, avatarUrl?: string | null, roles?: Array<{ __typename?: 'UserRole', _id: string, name: string, scope: string, description?: string | null } | null> | null } | null> | null };

export type CreateUserToRoleMutationVariables = Exact<{
  user: Scalars['ID'];
  role: Scalars['ID'];
  scope: Scalars['String'];
}>;


export type CreateUserToRoleMutation = { __typename?: 'Mutation', createUserToRole?: { __typename?: 'UserToRole', _id: string } | null };

export type ScheduleFieldsFragment = { __typename?: 'Schedule', _id: string, createdAt?: string | null, date?: number | null, status?: string | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null };

export type FindSchedulesQueryVariables = Exact<{
  user?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Float']>;
  endDate?: InputMaybe<Scalars['Float']>;
}>;


export type FindSchedulesQuery = { __typename?: 'Query', findSchedules?: Array<{ __typename?: 'Schedule', _id: string, createdAt?: string | null, date?: number | null, status?: string | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null> | null };

export type CreateScheduleMutationVariables = Exact<{
  status: Scalars['String'];
  date: Scalars['Float'];
  user?: InputMaybe<Scalars['ID']>;
}>;


export type CreateScheduleMutation = { __typename?: 'Mutation', schedule?: { __typename?: 'Schedule', _id: string, createdAt?: string | null, date?: number | null, status?: string | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type ScheduleCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ScheduleCreatedSubscription = { __typename?: 'Subscription', schedule?: { __typename?: 'Schedule', _id: string, createdAt?: string | null, date?: number | null, status?: string | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type UserFieldsFragment = { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null };

export type FindUsersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
}>;


export type FindUsersQuery = { __typename?: 'Query', findUsers?: Array<{ __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null> | null };

export type FindUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type FindUserInfoQuery = { __typename?: 'Query', findUserInfo?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null };

export type LoginQueryVariables = Exact<{
  input?: InputMaybe<LoginUserInput>;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'UserWithToken', token: string, user: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } } | null };

export type UpdateUserInfoMutationVariables = Exact<{
  input?: InputMaybe<UpdateUserInfoInput>;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUserInfo?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null };

export type AdminPushUsersTagsMutationVariables = Exact<{
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type AdminPushUsersTagsMutation = { __typename?: 'Mutation', adminPushUsersTags?: { __typename?: 'Result', success?: boolean | null } | null };

export type AdminPullUsersTagsMutationVariables = Exact<{
  users?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type AdminPullUsersTagsMutation = { __typename?: 'Mutation', adminPullUsersTags?: { __typename?: 'Result', success?: boolean | null } | null };

export type SeatFieldsFragment = { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null };

export type UserToSeatFieldsFragment = { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null };

export type FindSeatsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindSeatsQuery = { __typename?: 'Query', findSeats?: Array<{ __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null> | null };

export type UpdateSeatMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  disabled?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateSeatMutation = { __typename?: 'Mutation', updateSeat?: { __typename?: 'Result', success?: boolean | null } | null };

export type SetSeatsTagsMutationVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type SetSeatsTagsMutation = { __typename?: 'Mutation', setSeatsTags?: { __typename?: 'Result', success?: boolean | null } | null };

export type PushSeatsTagsMutationVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type PushSeatsTagsMutation = { __typename?: 'Mutation', pushSeatsTags?: { __typename?: 'Result', success?: boolean | null } | null };

export type PullSeatsTagsMutationVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type PullSeatsTagsMutation = { __typename?: 'Mutation', pullSeatsTags?: { __typename?: 'Result', success?: boolean | null } | null };

export type FindUserToSeatsQueryVariables = Exact<{
  seat?: InputMaybe<Scalars['ID']>;
  user?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Float']>;
  endDate?: InputMaybe<Scalars['Float']>;
}>;


export type FindUserToSeatsQuery = { __typename?: 'Query', list?: Array<{ __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null> | null };

export type FindUserToSeatQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;


export type FindUserToSeatQuery = { __typename?: 'Query', userToSeat?: { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type CreateUserToSeatMutationVariables = Exact<{
  seat: Scalars['ID'];
  date: Scalars['Float'];
}>;


export type CreateUserToSeatMutation = { __typename?: 'Mutation', userToSeat?: { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type DeleteUserToSeatMutationVariables = Exact<{
  seat: Scalars['ID'];
  date: Scalars['Float'];
}>;


export type DeleteUserToSeatMutation = { __typename?: 'Mutation', userToSeat?: { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type ToggleUserToSeatMutationVariables = Exact<{
  seat: Scalars['ID'];
  date: Scalars['Float'];
  user: Scalars['ID'];
}>;


export type ToggleUserToSeatMutation = { __typename?: 'Mutation', userToSeat?: { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type UserToSeatCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserToSeatCreatedSubscription = { __typename?: 'Subscription', userToSeat?: { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export type UserToSeatDeletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserToSeatDeletedSubscription = { __typename?: 'Subscription', userToSeat?: { __typename?: 'UserToSeat', _id: string, createdAt?: string | null, date?: number | null, seat?: { __typename?: 'Seat', _id: string, id: string, tags?: Array<string | null> | null, disabled?: boolean | null } | null, user?: { __typename: 'User', _id: string, nickname?: string | null, username?: string | null, avatarUrl?: string | null, sign?: string | null, birthday?: string | null, sex?: number | null, position?: string | null, company?: string | null, tags?: Array<string | null> | null } | null } | null };

export const CommentFieldsFragmentDoc = gql`
    fragment commentFields on Comment {
  _id
  content
  createdAt
  likeCount
  likeStatus
  user {
    _id
    nickname
    username
    avatarUrl
  }
  comments {
    _id
    content
    createdAt
    likeCount
    likeStatus
    user {
      _id
      nickname
      username
      avatarUrl
    }
    commentTo {
      _id
    }
    replyTo {
      _id
      user {
        _id
        nickname
        username
        avatarUrl
      }
    }
  }
}
    `;
export const ReplyFieldsFragmentDoc = gql`
    fragment replyFields on Reply {
  _id
  content
  createdAt
  likeCount
  likeStatus
  user {
    _id
    nickname
    username
    avatarUrl
  }
  commentTo {
    _id
  }
  replyTo {
    _id
    user {
      _id
      nickname
      username
      avatarUrl
    }
  }
}
    `;
export const DynamicFieldsFragmentDoc = gql`
    fragment dynamicFields on Dynamic {
  _id
  createdAt
  content
  pictures
  likeCount
  likeStatus
  commentCount
  shareCount
  user {
    _id
    nickname
    username
    avatarUrl
  }
}
    `;
export const LikeFieldsFragmentDoc = gql`
    fragment likeFields on Like {
  _id
}
    `;
export const OrganizationFieldsFragmentDoc = gql`
    fragment organizationFields on Organization {
  _id
  name
  description
  logo
}
    `;
export const RetroFieldsFragmentDoc = gql`
    fragment retroFields on Retro {
  __typename
  _id
  title
  content
  date
  anonymous
  user {
    _id
    nickname
    username
    avatarUrl
  }
}
    `;
export const RetroListItemFieldsFragmentDoc = gql`
    fragment retroListItemFields on RetroListItem {
  __typename
  _id
  title
  content
  date
  anonymous
  likeCount
  happyCount
  unhappyCount
  wonderringCount
  todoCount
  user {
    _id
    nickname
    avatarUrl
  }
}
    `;
export const RetroMessageFieldsFragmentDoc = gql`
    fragment retroMessageFields on RetroMessage {
  _id
  content
  status
  type
  like
  createdAt
  updatedAt
  pictures
  anonymous
  user {
    _id
    nickname
    username
    avatarUrl
  }
}
    `;
export const UserRoleFieldsFragmentDoc = gql`
    fragment userRoleFields on UserRole {
  _id
  name
  scope
  description
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment userFields on User {
  __typename
  _id
  nickname
  username
  avatarUrl
  sign
  birthday
  sex
  position
  company
  tags
}
    `;
export const UserToRoleFieldsFragmentDoc = gql`
    fragment userToRoleFields on UserToRole {
  _id
  createdAt
  role {
    ...userRoleFields
  }
  user {
    ...userFields
  }
}
    ${UserRoleFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;
export const UserWithRoleFieldsFragmentDoc = gql`
    fragment userWithRoleFields on UserWithRole {
  _id
  username
  nickname
  avatarUrl
  roles {
    ...userRoleFields
  }
}
    ${UserRoleFieldsFragmentDoc}`;
export const ScheduleFieldsFragmentDoc = gql`
    fragment scheduleFields on Schedule {
  _id
  createdAt
  date
  status
  user {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export const SeatFieldsFragmentDoc = gql`
    fragment seatFields on Seat {
  _id
  id
  tags
  disabled
}
    `;
export const UserToSeatFieldsFragmentDoc = gql`
    fragment userToSeatFields on UserToSeat {
  _id
  createdAt
  date
  seat {
    ...seatFields
  }
  user {
    ...userFields
  }
}
    ${SeatFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;
export const FindCommentsDocument = gql`
    query FindComments($object: ID!) {
  findComments(object: $object) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useFindCommentsQuery__
 *
 * To run a query within a React component, call `useFindCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentsQuery({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useFindCommentsQuery(baseOptions: Apollo.QueryHookOptions<FindCommentsQuery, FindCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCommentsQuery, FindCommentsQueryVariables>(FindCommentsDocument, options);
      }
export function useFindCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommentsQuery, FindCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCommentsQuery, FindCommentsQueryVariables>(FindCommentsDocument, options);
        }
export type FindCommentsQueryHookResult = ReturnType<typeof useFindCommentsQuery>;
export type FindCommentsLazyQueryHookResult = ReturnType<typeof useFindCommentsLazyQuery>;
export type FindCommentsQueryResult = Apollo.QueryResult<FindCommentsQuery, FindCommentsQueryVariables>;
export const FindCommentDocument = gql`
    query FindComment($_id: ID!) {
  findComment(_id: $_id) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;

/**
 * __useFindCommentQuery__
 *
 * To run a query within a React component, call `useFindCommentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindCommentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindCommentQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindCommentQuery(baseOptions: Apollo.QueryHookOptions<FindCommentQuery, FindCommentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindCommentQuery, FindCommentQueryVariables>(FindCommentDocument, options);
      }
export function useFindCommentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindCommentQuery, FindCommentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindCommentQuery, FindCommentQueryVariables>(FindCommentDocument, options);
        }
export type FindCommentQueryHookResult = ReturnType<typeof useFindCommentQuery>;
export type FindCommentLazyQueryHookResult = ReturnType<typeof useFindCommentLazyQuery>;
export type FindCommentQueryResult = Apollo.QueryResult<FindCommentQuery, FindCommentQueryVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($object: ID!, $objectModel: CommentObjectUnionModel!, $content: String!) {
  createComment(
    input: {object: $object, objectModel: $objectModel, content: $content}
  ) {
    ...commentFields
  }
}
    ${CommentFieldsFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      object: // value for 'object'
 *      objectModel: // value for 'objectModel'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const ReplyCommentDocument = gql`
    mutation ReplyComment($to: ID!, $content: String!) {
  replyComment(input: {to: $to, content: $content}) {
    ...replyFields
  }
}
    ${ReplyFieldsFragmentDoc}`;
export type ReplyCommentMutationFn = Apollo.MutationFunction<ReplyCommentMutation, ReplyCommentMutationVariables>;

/**
 * __useReplyCommentMutation__
 *
 * To run a mutation, you first call `useReplyCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReplyCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [replyCommentMutation, { data, loading, error }] = useReplyCommentMutation({
 *   variables: {
 *      to: // value for 'to'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useReplyCommentMutation(baseOptions?: Apollo.MutationHookOptions<ReplyCommentMutation, ReplyCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReplyCommentMutation, ReplyCommentMutationVariables>(ReplyCommentDocument, options);
      }
export type ReplyCommentMutationHookResult = ReturnType<typeof useReplyCommentMutation>;
export type ReplyCommentMutationResult = Apollo.MutationResult<ReplyCommentMutation>;
export type ReplyCommentMutationOptions = Apollo.BaseMutationOptions<ReplyCommentMutation, ReplyCommentMutationVariables>;
export const FindDynamicsDocument = gql`
    query FindDynamics {
  findDynamics {
    ...dynamicFields
  }
}
    ${DynamicFieldsFragmentDoc}`;

/**
 * __useFindDynamicsQuery__
 *
 * To run a query within a React component, call `useFindDynamicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDynamicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDynamicsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindDynamicsQuery(baseOptions?: Apollo.QueryHookOptions<FindDynamicsQuery, FindDynamicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDynamicsQuery, FindDynamicsQueryVariables>(FindDynamicsDocument, options);
      }
export function useFindDynamicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDynamicsQuery, FindDynamicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDynamicsQuery, FindDynamicsQueryVariables>(FindDynamicsDocument, options);
        }
export type FindDynamicsQueryHookResult = ReturnType<typeof useFindDynamicsQuery>;
export type FindDynamicsLazyQueryHookResult = ReturnType<typeof useFindDynamicsLazyQuery>;
export type FindDynamicsQueryResult = Apollo.QueryResult<FindDynamicsQuery, FindDynamicsQueryVariables>;
export const FindDynamicDocument = gql`
    query FindDynamic($_id: ID!) {
  findDynamic(_id: $_id) {
    ...dynamicFields
  }
}
    ${DynamicFieldsFragmentDoc}`;

/**
 * __useFindDynamicQuery__
 *
 * To run a query within a React component, call `useFindDynamicQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindDynamicQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindDynamicQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindDynamicQuery(baseOptions: Apollo.QueryHookOptions<FindDynamicQuery, FindDynamicQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindDynamicQuery, FindDynamicQueryVariables>(FindDynamicDocument, options);
      }
export function useFindDynamicLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindDynamicQuery, FindDynamicQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindDynamicQuery, FindDynamicQueryVariables>(FindDynamicDocument, options);
        }
export type FindDynamicQueryHookResult = ReturnType<typeof useFindDynamicQuery>;
export type FindDynamicLazyQueryHookResult = ReturnType<typeof useFindDynamicLazyQuery>;
export type FindDynamicQueryResult = Apollo.QueryResult<FindDynamicQuery, FindDynamicQueryVariables>;
export const CreateDynamicDocument = gql`
    mutation CreateDynamic($content: String!, $pictures: [String!]) {
  createDynamic(input: {content: $content, pictures: $pictures}) {
    ...dynamicFields
  }
}
    ${DynamicFieldsFragmentDoc}`;
export type CreateDynamicMutationFn = Apollo.MutationFunction<CreateDynamicMutation, CreateDynamicMutationVariables>;

/**
 * __useCreateDynamicMutation__
 *
 * To run a mutation, you first call `useCreateDynamicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDynamicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDynamicMutation, { data, loading, error }] = useCreateDynamicMutation({
 *   variables: {
 *      content: // value for 'content'
 *      pictures: // value for 'pictures'
 *   },
 * });
 */
export function useCreateDynamicMutation(baseOptions?: Apollo.MutationHookOptions<CreateDynamicMutation, CreateDynamicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDynamicMutation, CreateDynamicMutationVariables>(CreateDynamicDocument, options);
      }
export type CreateDynamicMutationHookResult = ReturnType<typeof useCreateDynamicMutation>;
export type CreateDynamicMutationResult = Apollo.MutationResult<CreateDynamicMutation>;
export type CreateDynamicMutationOptions = Apollo.BaseMutationOptions<CreateDynamicMutation, CreateDynamicMutationVariables>;
export const FindLikesDocument = gql`
    query FindLikes($object: ID!) {
  findLikes(object: $object) {
    ...likeFields
  }
}
    ${LikeFieldsFragmentDoc}`;

/**
 * __useFindLikesQuery__
 *
 * To run a query within a React component, call `useFindLikesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLikesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLikesQuery({
 *   variables: {
 *      object: // value for 'object'
 *   },
 * });
 */
export function useFindLikesQuery(baseOptions: Apollo.QueryHookOptions<FindLikesQuery, FindLikesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLikesQuery, FindLikesQueryVariables>(FindLikesDocument, options);
      }
export function useFindLikesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLikesQuery, FindLikesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLikesQuery, FindLikesQueryVariables>(FindLikesDocument, options);
        }
export type FindLikesQueryHookResult = ReturnType<typeof useFindLikesQuery>;
export type FindLikesLazyQueryHookResult = ReturnType<typeof useFindLikesLazyQuery>;
export type FindLikesQueryResult = Apollo.QueryResult<FindLikesQuery, FindLikesQueryVariables>;
export const FindLikeDocument = gql`
    query FindLike($_id: ID!) {
  findLike(_id: $_id) {
    ...likeFields
  }
}
    ${LikeFieldsFragmentDoc}`;

/**
 * __useFindLikeQuery__
 *
 * To run a query within a React component, call `useFindLikeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindLikeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindLikeQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindLikeQuery(baseOptions: Apollo.QueryHookOptions<FindLikeQuery, FindLikeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindLikeQuery, FindLikeQueryVariables>(FindLikeDocument, options);
      }
export function useFindLikeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindLikeQuery, FindLikeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindLikeQuery, FindLikeQueryVariables>(FindLikeDocument, options);
        }
export type FindLikeQueryHookResult = ReturnType<typeof useFindLikeQuery>;
export type FindLikeLazyQueryHookResult = ReturnType<typeof useFindLikeLazyQuery>;
export type FindLikeQueryResult = Apollo.QueryResult<FindLikeQuery, FindLikeQueryVariables>;
export const CreateLikeDocument = gql`
    mutation CreateLike($object: ID!, $objectModel: LikeObjectUnionModel!) {
  createLike(input: {object: $object, objectModel: $objectModel}) {
    ...likeFields
  }
}
    ${LikeFieldsFragmentDoc}`;
export type CreateLikeMutationFn = Apollo.MutationFunction<CreateLikeMutation, CreateLikeMutationVariables>;

/**
 * __useCreateLikeMutation__
 *
 * To run a mutation, you first call `useCreateLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLikeMutation, { data, loading, error }] = useCreateLikeMutation({
 *   variables: {
 *      object: // value for 'object'
 *      objectModel: // value for 'objectModel'
 *   },
 * });
 */
export function useCreateLikeMutation(baseOptions?: Apollo.MutationHookOptions<CreateLikeMutation, CreateLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(CreateLikeDocument, options);
      }
export type CreateLikeMutationHookResult = ReturnType<typeof useCreateLikeMutation>;
export type CreateLikeMutationResult = Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<CreateLikeMutation, CreateLikeMutationVariables>;
export const FindOrganizationsDocument = gql`
    query FindOrganizations {
  currentOrganization {
    ...organizationFields
  }
  myOrganizations {
    ...organizationFields
  }
  currentOrganizationUsers {
    ...userFields
  }
}
    ${OrganizationFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;

/**
 * __useFindOrganizationsQuery__
 *
 * To run a query within a React component, call `useFindOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOrganizationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindOrganizationsQuery(baseOptions?: Apollo.QueryHookOptions<FindOrganizationsQuery, FindOrganizationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOrganizationsQuery, FindOrganizationsQueryVariables>(FindOrganizationsDocument, options);
      }
export function useFindOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOrganizationsQuery, FindOrganizationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOrganizationsQuery, FindOrganizationsQueryVariables>(FindOrganizationsDocument, options);
        }
export type FindOrganizationsQueryHookResult = ReturnType<typeof useFindOrganizationsQuery>;
export type FindOrganizationsLazyQueryHookResult = ReturnType<typeof useFindOrganizationsLazyQuery>;
export type FindOrganizationsQueryResult = Apollo.QueryResult<FindOrganizationsQuery, FindOrganizationsQueryVariables>;
export const FindOrganizationDocument = gql`
    query FindOrganization($_id: ID!) {
  item: findOrganization(_id: $_id) {
    ...organizationFields
  }
}
    ${OrganizationFieldsFragmentDoc}`;

/**
 * __useFindOrganizationQuery__
 *
 * To run a query within a React component, call `useFindOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOrganizationQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindOrganizationQuery(baseOptions: Apollo.QueryHookOptions<FindOrganizationQuery, FindOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOrganizationQuery, FindOrganizationQueryVariables>(FindOrganizationDocument, options);
      }
export function useFindOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOrganizationQuery, FindOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOrganizationQuery, FindOrganizationQueryVariables>(FindOrganizationDocument, options);
        }
export type FindOrganizationQueryHookResult = ReturnType<typeof useFindOrganizationQuery>;
export type FindOrganizationLazyQueryHookResult = ReturnType<typeof useFindOrganizationLazyQuery>;
export type FindOrganizationQueryResult = Apollo.QueryResult<FindOrganizationQuery, FindOrganizationQueryVariables>;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($name: String!, $description: String!, $logo: String!) {
  createOrganization(input: {description: $description, logo: $logo, name: $name}) {
    ...organizationFields
  }
}
    ${OrganizationFieldsFragmentDoc}`;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      logo: // value for 'logo'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const FindRetrosDocument = gql`
    query FindRetros($page: Int, $pageSize: Int) {
  findRetros(page: $page, pageSize: $pageSize) {
    ...retroListItemFields
  }
}
    ${RetroListItemFieldsFragmentDoc}`;

/**
 * __useFindRetrosQuery__
 *
 * To run a query within a React component, call `useFindRetrosQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRetrosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRetrosQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useFindRetrosQuery(baseOptions?: Apollo.QueryHookOptions<FindRetrosQuery, FindRetrosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRetrosQuery, FindRetrosQueryVariables>(FindRetrosDocument, options);
      }
export function useFindRetrosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRetrosQuery, FindRetrosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRetrosQuery, FindRetrosQueryVariables>(FindRetrosDocument, options);
        }
export type FindRetrosQueryHookResult = ReturnType<typeof useFindRetrosQuery>;
export type FindRetrosLazyQueryHookResult = ReturnType<typeof useFindRetrosLazyQuery>;
export type FindRetrosQueryResult = Apollo.QueryResult<FindRetrosQuery, FindRetrosQueryVariables>;
export const FindRetroDocument = gql`
    query FindRetro($_id: ID!) {
  findRetro(_id: $_id) {
    ...retroFields
  }
}
    ${RetroFieldsFragmentDoc}`;

/**
 * __useFindRetroQuery__
 *
 * To run a query within a React component, call `useFindRetroQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRetroQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRetroQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindRetroQuery(baseOptions: Apollo.QueryHookOptions<FindRetroQuery, FindRetroQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRetroQuery, FindRetroQueryVariables>(FindRetroDocument, options);
      }
export function useFindRetroLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRetroQuery, FindRetroQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRetroQuery, FindRetroQueryVariables>(FindRetroDocument, options);
        }
export type FindRetroQueryHookResult = ReturnType<typeof useFindRetroQuery>;
export type FindRetroLazyQueryHookResult = ReturnType<typeof useFindRetroLazyQuery>;
export type FindRetroQueryResult = Apollo.QueryResult<FindRetroQuery, FindRetroQueryVariables>;
export const CreateRetroDocument = gql`
    mutation CreateRetro($title: String, $content: String, $date: String!, $anonymous: Boolean) {
  createRetro(
    input: {title: $title, content: $content, date: $date, anonymous: $anonymous}
  ) {
    ...retroFields
  }
}
    ${RetroFieldsFragmentDoc}`;
export type CreateRetroMutationFn = Apollo.MutationFunction<CreateRetroMutation, CreateRetroMutationVariables>;

/**
 * __useCreateRetroMutation__
 *
 * To run a mutation, you first call `useCreateRetroMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRetroMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRetroMutation, { data, loading, error }] = useCreateRetroMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      date: // value for 'date'
 *      anonymous: // value for 'anonymous'
 *   },
 * });
 */
export function useCreateRetroMutation(baseOptions?: Apollo.MutationHookOptions<CreateRetroMutation, CreateRetroMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRetroMutation, CreateRetroMutationVariables>(CreateRetroDocument, options);
      }
export type CreateRetroMutationHookResult = ReturnType<typeof useCreateRetroMutation>;
export type CreateRetroMutationResult = Apollo.MutationResult<CreateRetroMutation>;
export type CreateRetroMutationOptions = Apollo.BaseMutationOptions<CreateRetroMutation, CreateRetroMutationVariables>;
export const RetroCreatedDocument = gql`
    subscription RetroCreated {
  retroCreated {
    ...retroFields
  }
}
    ${RetroFieldsFragmentDoc}`;

/**
 * __useRetroCreatedSubscription__
 *
 * To run a query within a React component, call `useRetroCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRetroCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetroCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRetroCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RetroCreatedSubscription, RetroCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RetroCreatedSubscription, RetroCreatedSubscriptionVariables>(RetroCreatedDocument, options);
      }
export type RetroCreatedSubscriptionHookResult = ReturnType<typeof useRetroCreatedSubscription>;
export type RetroCreatedSubscriptionResult = Apollo.SubscriptionResult<RetroCreatedSubscription>;
export const FindRetroSectionDocument = gql`
    query FindRetroSection($retro: ID!) {
  retroMessages: findRetroMessages(retro: $retro) {
    ...retroMessageFields
  }
  retro: findRetro(_id: $retro) {
    ...retroFields
  }
  userInfo: findUserInfo {
    _id
    nickname
    username
    avatarUrl
  }
}
    ${RetroMessageFieldsFragmentDoc}
${RetroFieldsFragmentDoc}`;

/**
 * __useFindRetroSectionQuery__
 *
 * To run a query within a React component, call `useFindRetroSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRetroSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRetroSectionQuery({
 *   variables: {
 *      retro: // value for 'retro'
 *   },
 * });
 */
export function useFindRetroSectionQuery(baseOptions: Apollo.QueryHookOptions<FindRetroSectionQuery, FindRetroSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRetroSectionQuery, FindRetroSectionQueryVariables>(FindRetroSectionDocument, options);
      }
export function useFindRetroSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRetroSectionQuery, FindRetroSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRetroSectionQuery, FindRetroSectionQueryVariables>(FindRetroSectionDocument, options);
        }
export type FindRetroSectionQueryHookResult = ReturnType<typeof useFindRetroSectionQuery>;
export type FindRetroSectionLazyQueryHookResult = ReturnType<typeof useFindRetroSectionLazyQuery>;
export type FindRetroSectionQueryResult = Apollo.QueryResult<FindRetroSectionQuery, FindRetroSectionQueryVariables>;
export const FindRetroMessagesDocument = gql`
    query FindRetroMessages($retro: ID!) {
  retroMessages: findRetroMessages(retro: $retro) {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;

/**
 * __useFindRetroMessagesQuery__
 *
 * To run a query within a React component, call `useFindRetroMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRetroMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRetroMessagesQuery({
 *   variables: {
 *      retro: // value for 'retro'
 *   },
 * });
 */
export function useFindRetroMessagesQuery(baseOptions: Apollo.QueryHookOptions<FindRetroMessagesQuery, FindRetroMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRetroMessagesQuery, FindRetroMessagesQueryVariables>(FindRetroMessagesDocument, options);
      }
export function useFindRetroMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRetroMessagesQuery, FindRetroMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRetroMessagesQuery, FindRetroMessagesQueryVariables>(FindRetroMessagesDocument, options);
        }
export type FindRetroMessagesQueryHookResult = ReturnType<typeof useFindRetroMessagesQuery>;
export type FindRetroMessagesLazyQueryHookResult = ReturnType<typeof useFindRetroMessagesLazyQuery>;
export type FindRetroMessagesQueryResult = Apollo.QueryResult<FindRetroMessagesQuery, FindRetroMessagesQueryVariables>;
export const FindRetroMessageDocument = gql`
    query FindRetroMessage($_id: ID!) {
  retroMessage: findRetroMessage(_id: $_id) {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;

/**
 * __useFindRetroMessageQuery__
 *
 * To run a query within a React component, call `useFindRetroMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRetroMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRetroMessageQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindRetroMessageQuery(baseOptions: Apollo.QueryHookOptions<FindRetroMessageQuery, FindRetroMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRetroMessageQuery, FindRetroMessageQueryVariables>(FindRetroMessageDocument, options);
      }
export function useFindRetroMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRetroMessageQuery, FindRetroMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRetroMessageQuery, FindRetroMessageQueryVariables>(FindRetroMessageDocument, options);
        }
export type FindRetroMessageQueryHookResult = ReturnType<typeof useFindRetroMessageQuery>;
export type FindRetroMessageLazyQueryHookResult = ReturnType<typeof useFindRetroMessageLazyQuery>;
export type FindRetroMessageQueryResult = Apollo.QueryResult<FindRetroMessageQuery, FindRetroMessageQueryVariables>;
export const CreateRetroMessageDocument = gql`
    mutation CreateRetroMessage($retro: ID!, $content: String!, $type: RetroMessageType!, $pictures: [String!], $anonymous: Boolean) {
  retroMessage: createRetroMessage(
    input: {retro: $retro, content: $content, type: $type, pictures: $pictures, anonymous: $anonymous}
  ) {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;
export type CreateRetroMessageMutationFn = Apollo.MutationFunction<CreateRetroMessageMutation, CreateRetroMessageMutationVariables>;

/**
 * __useCreateRetroMessageMutation__
 *
 * To run a mutation, you first call `useCreateRetroMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRetroMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRetroMessageMutation, { data, loading, error }] = useCreateRetroMessageMutation({
 *   variables: {
 *      retro: // value for 'retro'
 *      content: // value for 'content'
 *      type: // value for 'type'
 *      pictures: // value for 'pictures'
 *      anonymous: // value for 'anonymous'
 *   },
 * });
 */
export function useCreateRetroMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateRetroMessageMutation, CreateRetroMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRetroMessageMutation, CreateRetroMessageMutationVariables>(CreateRetroMessageDocument, options);
      }
export type CreateRetroMessageMutationHookResult = ReturnType<typeof useCreateRetroMessageMutation>;
export type CreateRetroMessageMutationResult = Apollo.MutationResult<CreateRetroMessageMutation>;
export type CreateRetroMessageMutationOptions = Apollo.BaseMutationOptions<CreateRetroMessageMutation, CreateRetroMessageMutationVariables>;
export const UpdateRetroMessageDocument = gql`
    mutation UpdateRetroMessage($_id: ID!, $content: String, $type: RetroMessageType, $status: RetroMessageStatus, $pictures: [String!], $anonymous: Boolean) {
  retroMessage: updateRetroMessage(
    _id: $_id
    input: {content: $content, type: $type, status: $status, pictures: $pictures, anonymous: $anonymous}
  ) {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;
export type UpdateRetroMessageMutationFn = Apollo.MutationFunction<UpdateRetroMessageMutation, UpdateRetroMessageMutationVariables>;

/**
 * __useUpdateRetroMessageMutation__
 *
 * To run a mutation, you first call `useUpdateRetroMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRetroMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRetroMessageMutation, { data, loading, error }] = useUpdateRetroMessageMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      content: // value for 'content'
 *      type: // value for 'type'
 *      status: // value for 'status'
 *      pictures: // value for 'pictures'
 *      anonymous: // value for 'anonymous'
 *   },
 * });
 */
export function useUpdateRetroMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRetroMessageMutation, UpdateRetroMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRetroMessageMutation, UpdateRetroMessageMutationVariables>(UpdateRetroMessageDocument, options);
      }
export type UpdateRetroMessageMutationHookResult = ReturnType<typeof useUpdateRetroMessageMutation>;
export type UpdateRetroMessageMutationResult = Apollo.MutationResult<UpdateRetroMessageMutation>;
export type UpdateRetroMessageMutationOptions = Apollo.BaseMutationOptions<UpdateRetroMessageMutation, UpdateRetroMessageMutationVariables>;
export const LikeRetroMessageDocument = gql`
    mutation LikeRetroMessage($_id: ID!, $count: Int) {
  retroMessage: likeRetroMessage(_id: $_id, count: $count) {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;
export type LikeRetroMessageMutationFn = Apollo.MutationFunction<LikeRetroMessageMutation, LikeRetroMessageMutationVariables>;

/**
 * __useLikeRetroMessageMutation__
 *
 * To run a mutation, you first call `useLikeRetroMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeRetroMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeRetroMessageMutation, { data, loading, error }] = useLikeRetroMessageMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      count: // value for 'count'
 *   },
 * });
 */
export function useLikeRetroMessageMutation(baseOptions?: Apollo.MutationHookOptions<LikeRetroMessageMutation, LikeRetroMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeRetroMessageMutation, LikeRetroMessageMutationVariables>(LikeRetroMessageDocument, options);
      }
export type LikeRetroMessageMutationHookResult = ReturnType<typeof useLikeRetroMessageMutation>;
export type LikeRetroMessageMutationResult = Apollo.MutationResult<LikeRetroMessageMutation>;
export type LikeRetroMessageMutationOptions = Apollo.BaseMutationOptions<LikeRetroMessageMutation, LikeRetroMessageMutationVariables>;
export const DeleteRetroMessageDocument = gql`
    mutation DeleteRetroMessage($_id: ID!) {
  retroMessage: deleteRetroMessage(_id: $_id) {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;
export type DeleteRetroMessageMutationFn = Apollo.MutationFunction<DeleteRetroMessageMutation, DeleteRetroMessageMutationVariables>;

/**
 * __useDeleteRetroMessageMutation__
 *
 * To run a mutation, you first call `useDeleteRetroMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRetroMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRetroMessageMutation, { data, loading, error }] = useDeleteRetroMessageMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteRetroMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRetroMessageMutation, DeleteRetroMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRetroMessageMutation, DeleteRetroMessageMutationVariables>(DeleteRetroMessageDocument, options);
      }
export type DeleteRetroMessageMutationHookResult = ReturnType<typeof useDeleteRetroMessageMutation>;
export type DeleteRetroMessageMutationResult = Apollo.MutationResult<DeleteRetroMessageMutation>;
export type DeleteRetroMessageMutationOptions = Apollo.BaseMutationOptions<DeleteRetroMessageMutation, DeleteRetroMessageMutationVariables>;
export const RetroMessageCreatedDocument = gql`
    subscription RetroMessageCreated {
  retroMessage: retroMessageCreated {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;

/**
 * __useRetroMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useRetroMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRetroMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetroMessageCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRetroMessageCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RetroMessageCreatedSubscription, RetroMessageCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RetroMessageCreatedSubscription, RetroMessageCreatedSubscriptionVariables>(RetroMessageCreatedDocument, options);
      }
export type RetroMessageCreatedSubscriptionHookResult = ReturnType<typeof useRetroMessageCreatedSubscription>;
export type RetroMessageCreatedSubscriptionResult = Apollo.SubscriptionResult<RetroMessageCreatedSubscription>;
export const RetroMessageUpdatedDocument = gql`
    subscription RetroMessageUpdated {
  retroMessage: retroMessageUpdated {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;

/**
 * __useRetroMessageUpdatedSubscription__
 *
 * To run a query within a React component, call `useRetroMessageUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRetroMessageUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetroMessageUpdatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRetroMessageUpdatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RetroMessageUpdatedSubscription, RetroMessageUpdatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RetroMessageUpdatedSubscription, RetroMessageUpdatedSubscriptionVariables>(RetroMessageUpdatedDocument, options);
      }
export type RetroMessageUpdatedSubscriptionHookResult = ReturnType<typeof useRetroMessageUpdatedSubscription>;
export type RetroMessageUpdatedSubscriptionResult = Apollo.SubscriptionResult<RetroMessageUpdatedSubscription>;
export const RetroMessageLikedDocument = gql`
    subscription RetroMessageLiked {
  retroMessage: retroMessageLiked {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;

/**
 * __useRetroMessageLikedSubscription__
 *
 * To run a query within a React component, call `useRetroMessageLikedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRetroMessageLikedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetroMessageLikedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRetroMessageLikedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RetroMessageLikedSubscription, RetroMessageLikedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RetroMessageLikedSubscription, RetroMessageLikedSubscriptionVariables>(RetroMessageLikedDocument, options);
      }
export type RetroMessageLikedSubscriptionHookResult = ReturnType<typeof useRetroMessageLikedSubscription>;
export type RetroMessageLikedSubscriptionResult = Apollo.SubscriptionResult<RetroMessageLikedSubscription>;
export const RetroMessageDeletedDocument = gql`
    subscription RetroMessageDeleted {
  retroMessage: retroMessageDeleted {
    ...retroMessageFields
  }
}
    ${RetroMessageFieldsFragmentDoc}`;

/**
 * __useRetroMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useRetroMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRetroMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetroMessageDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRetroMessageDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RetroMessageDeletedSubscription, RetroMessageDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<RetroMessageDeletedSubscription, RetroMessageDeletedSubscriptionVariables>(RetroMessageDeletedDocument, options);
      }
export type RetroMessageDeletedSubscriptionHookResult = ReturnType<typeof useRetroMessageDeletedSubscription>;
export type RetroMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<RetroMessageDeletedSubscription>;
export const FindRolesDocument = gql`
    query FindRoles {
  findRoles {
    ...userRoleFields
  }
}
    ${UserRoleFieldsFragmentDoc}`;

/**
 * __useFindRolesQuery__
 *
 * To run a query within a React component, call `useFindRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindRolesQuery(baseOptions?: Apollo.QueryHookOptions<FindRolesQuery, FindRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRolesQuery, FindRolesQueryVariables>(FindRolesDocument, options);
      }
export function useFindRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRolesQuery, FindRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRolesQuery, FindRolesQueryVariables>(FindRolesDocument, options);
        }
export type FindRolesQueryHookResult = ReturnType<typeof useFindRolesQuery>;
export type FindRolesLazyQueryHookResult = ReturnType<typeof useFindRolesLazyQuery>;
export type FindRolesQueryResult = Apollo.QueryResult<FindRolesQuery, FindRolesQueryVariables>;
export const FindSeatSelectionUsersDocument = gql`
    query FindSeatSelectionUsers($limit: Int, $skip: Int, $role: ID, $user: ID) {
  list: findSeatSelectionUsers(
    limit: $limit
    skip: $skip
    role: $role
    user: $user
  ) {
    ...userWithRoleFields
  }
}
    ${UserWithRoleFieldsFragmentDoc}`;

/**
 * __useFindSeatSelectionUsersQuery__
 *
 * To run a query within a React component, call `useFindSeatSelectionUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSeatSelectionUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSeatSelectionUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *      role: // value for 'role'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useFindSeatSelectionUsersQuery(baseOptions?: Apollo.QueryHookOptions<FindSeatSelectionUsersQuery, FindSeatSelectionUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSeatSelectionUsersQuery, FindSeatSelectionUsersQueryVariables>(FindSeatSelectionUsersDocument, options);
      }
export function useFindSeatSelectionUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSeatSelectionUsersQuery, FindSeatSelectionUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSeatSelectionUsersQuery, FindSeatSelectionUsersQueryVariables>(FindSeatSelectionUsersDocument, options);
        }
export type FindSeatSelectionUsersQueryHookResult = ReturnType<typeof useFindSeatSelectionUsersQuery>;
export type FindSeatSelectionUsersLazyQueryHookResult = ReturnType<typeof useFindSeatSelectionUsersLazyQuery>;
export type FindSeatSelectionUsersQueryResult = Apollo.QueryResult<FindSeatSelectionUsersQuery, FindSeatSelectionUsersQueryVariables>;
export const CreateUserToRoleDocument = gql`
    mutation CreateUserToRole($user: ID!, $role: ID!, $scope: String!) {
  createUserToRole(input: {user: $user, role: $role, scope: $scope}) {
    _id
  }
}
    `;
export type CreateUserToRoleMutationFn = Apollo.MutationFunction<CreateUserToRoleMutation, CreateUserToRoleMutationVariables>;

/**
 * __useCreateUserToRoleMutation__
 *
 * To run a mutation, you first call `useCreateUserToRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserToRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserToRoleMutation, { data, loading, error }] = useCreateUserToRoleMutation({
 *   variables: {
 *      user: // value for 'user'
 *      role: // value for 'role'
 *      scope: // value for 'scope'
 *   },
 * });
 */
export function useCreateUserToRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserToRoleMutation, CreateUserToRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserToRoleMutation, CreateUserToRoleMutationVariables>(CreateUserToRoleDocument, options);
      }
export type CreateUserToRoleMutationHookResult = ReturnType<typeof useCreateUserToRoleMutation>;
export type CreateUserToRoleMutationResult = Apollo.MutationResult<CreateUserToRoleMutation>;
export type CreateUserToRoleMutationOptions = Apollo.BaseMutationOptions<CreateUserToRoleMutation, CreateUserToRoleMutationVariables>;
export const FindSchedulesDocument = gql`
    query FindSchedules($user: ID, $startDate: Float, $endDate: Float) {
  findSchedules(user: $user, startDate: $startDate, endDate: $endDate) {
    ...scheduleFields
  }
}
    ${ScheduleFieldsFragmentDoc}`;

/**
 * __useFindSchedulesQuery__
 *
 * To run a query within a React component, call `useFindSchedulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSchedulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSchedulesQuery({
 *   variables: {
 *      user: // value for 'user'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useFindSchedulesQuery(baseOptions?: Apollo.QueryHookOptions<FindSchedulesQuery, FindSchedulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSchedulesQuery, FindSchedulesQueryVariables>(FindSchedulesDocument, options);
      }
export function useFindSchedulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSchedulesQuery, FindSchedulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSchedulesQuery, FindSchedulesQueryVariables>(FindSchedulesDocument, options);
        }
export type FindSchedulesQueryHookResult = ReturnType<typeof useFindSchedulesQuery>;
export type FindSchedulesLazyQueryHookResult = ReturnType<typeof useFindSchedulesLazyQuery>;
export type FindSchedulesQueryResult = Apollo.QueryResult<FindSchedulesQuery, FindSchedulesQueryVariables>;
export const CreateScheduleDocument = gql`
    mutation CreateSchedule($status: String!, $date: Float!, $user: ID) {
  schedule: createSchedule(input: {status: $status, date: $date, user: $user}) {
    ...scheduleFields
  }
}
    ${ScheduleFieldsFragmentDoc}`;
export type CreateScheduleMutationFn = Apollo.MutationFunction<CreateScheduleMutation, CreateScheduleMutationVariables>;

/**
 * __useCreateScheduleMutation__
 *
 * To run a mutation, you first call `useCreateScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createScheduleMutation, { data, loading, error }] = useCreateScheduleMutation({
 *   variables: {
 *      status: // value for 'status'
 *      date: // value for 'date'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateScheduleMutation(baseOptions?: Apollo.MutationHookOptions<CreateScheduleMutation, CreateScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateScheduleMutation, CreateScheduleMutationVariables>(CreateScheduleDocument, options);
      }
export type CreateScheduleMutationHookResult = ReturnType<typeof useCreateScheduleMutation>;
export type CreateScheduleMutationResult = Apollo.MutationResult<CreateScheduleMutation>;
export type CreateScheduleMutationOptions = Apollo.BaseMutationOptions<CreateScheduleMutation, CreateScheduleMutationVariables>;
export const ScheduleCreatedDocument = gql`
    subscription scheduleCreated {
  schedule: scheduleCreated {
    ...scheduleFields
  }
}
    ${ScheduleFieldsFragmentDoc}`;

/**
 * __useScheduleCreatedSubscription__
 *
 * To run a query within a React component, call `useScheduleCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useScheduleCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduleCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useScheduleCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<ScheduleCreatedSubscription, ScheduleCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ScheduleCreatedSubscription, ScheduleCreatedSubscriptionVariables>(ScheduleCreatedDocument, options);
      }
export type ScheduleCreatedSubscriptionHookResult = ReturnType<typeof useScheduleCreatedSubscription>;
export type ScheduleCreatedSubscriptionResult = Apollo.SubscriptionResult<ScheduleCreatedSubscription>;
export const FindUsersDocument = gql`
    query FindUsers($search: String, $tags: [String], $limit: Int, $skip: Int) {
  findUsers(search: $search, tags: $tags, limit: $limit, skip: $skip) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useFindUsersQuery__
 *
 * To run a query within a React component, call `useFindUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *      tags: // value for 'tags'
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useFindUsersQuery(baseOptions?: Apollo.QueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
      }
export function useFindUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUsersQuery, FindUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUsersQuery, FindUsersQueryVariables>(FindUsersDocument, options);
        }
export type FindUsersQueryHookResult = ReturnType<typeof useFindUsersQuery>;
export type FindUsersLazyQueryHookResult = ReturnType<typeof useFindUsersLazyQuery>;
export type FindUsersQueryResult = Apollo.QueryResult<FindUsersQuery, FindUsersQueryVariables>;
export const FindUserInfoDocument = gql`
    query FindUserInfo {
  findUserInfo {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useFindUserInfoQuery__
 *
 * To run a query within a React component, call `useFindUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<FindUserInfoQuery, FindUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserInfoQuery, FindUserInfoQueryVariables>(FindUserInfoDocument, options);
      }
export function useFindUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserInfoQuery, FindUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserInfoQuery, FindUserInfoQueryVariables>(FindUserInfoDocument, options);
        }
export type FindUserInfoQueryHookResult = ReturnType<typeof useFindUserInfoQuery>;
export type FindUserInfoLazyQueryHookResult = ReturnType<typeof useFindUserInfoLazyQuery>;
export type FindUserInfoQueryResult = Apollo.QueryResult<FindUserInfoQuery, FindUserInfoQueryVariables>;
export const LoginDocument = gql`
    query Login($input: LoginUserInput) {
  login(input: $input) {
    user {
      ...userFields
    }
    token
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginQuery(baseOptions?: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($input: UpdateUserInfoInput) {
  updateUserInfo(input: $input) {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, options);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const AdminPushUsersTagsDocument = gql`
    mutation AdminPushUsersTags($users: [ID], $tags: [String]) {
  adminPushUsersTags(users: $users, tags: $tags) {
    success
  }
}
    `;
export type AdminPushUsersTagsMutationFn = Apollo.MutationFunction<AdminPushUsersTagsMutation, AdminPushUsersTagsMutationVariables>;

/**
 * __useAdminPushUsersTagsMutation__
 *
 * To run a mutation, you first call `useAdminPushUsersTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminPushUsersTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminPushUsersTagsMutation, { data, loading, error }] = useAdminPushUsersTagsMutation({
 *   variables: {
 *      users: // value for 'users'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAdminPushUsersTagsMutation(baseOptions?: Apollo.MutationHookOptions<AdminPushUsersTagsMutation, AdminPushUsersTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminPushUsersTagsMutation, AdminPushUsersTagsMutationVariables>(AdminPushUsersTagsDocument, options);
      }
export type AdminPushUsersTagsMutationHookResult = ReturnType<typeof useAdminPushUsersTagsMutation>;
export type AdminPushUsersTagsMutationResult = Apollo.MutationResult<AdminPushUsersTagsMutation>;
export type AdminPushUsersTagsMutationOptions = Apollo.BaseMutationOptions<AdminPushUsersTagsMutation, AdminPushUsersTagsMutationVariables>;
export const AdminPullUsersTagsDocument = gql`
    mutation AdminPullUsersTags($users: [ID], $tags: [String]) {
  adminPullUsersTags(users: $users, tags: $tags) {
    success
  }
}
    `;
export type AdminPullUsersTagsMutationFn = Apollo.MutationFunction<AdminPullUsersTagsMutation, AdminPullUsersTagsMutationVariables>;

/**
 * __useAdminPullUsersTagsMutation__
 *
 * To run a mutation, you first call `useAdminPullUsersTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminPullUsersTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminPullUsersTagsMutation, { data, loading, error }] = useAdminPullUsersTagsMutation({
 *   variables: {
 *      users: // value for 'users'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAdminPullUsersTagsMutation(baseOptions?: Apollo.MutationHookOptions<AdminPullUsersTagsMutation, AdminPullUsersTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminPullUsersTagsMutation, AdminPullUsersTagsMutationVariables>(AdminPullUsersTagsDocument, options);
      }
export type AdminPullUsersTagsMutationHookResult = ReturnType<typeof useAdminPullUsersTagsMutation>;
export type AdminPullUsersTagsMutationResult = Apollo.MutationResult<AdminPullUsersTagsMutation>;
export type AdminPullUsersTagsMutationOptions = Apollo.BaseMutationOptions<AdminPullUsersTagsMutation, AdminPullUsersTagsMutationVariables>;
export const FindSeatsDocument = gql`
    query FindSeats {
  findSeats {
    ...seatFields
  }
}
    ${SeatFieldsFragmentDoc}`;

/**
 * __useFindSeatsQuery__
 *
 * To run a query within a React component, call `useFindSeatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSeatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSeatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindSeatsQuery(baseOptions?: Apollo.QueryHookOptions<FindSeatsQuery, FindSeatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSeatsQuery, FindSeatsQueryVariables>(FindSeatsDocument, options);
      }
export function useFindSeatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSeatsQuery, FindSeatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSeatsQuery, FindSeatsQueryVariables>(FindSeatsDocument, options);
        }
export type FindSeatsQueryHookResult = ReturnType<typeof useFindSeatsQuery>;
export type FindSeatsLazyQueryHookResult = ReturnType<typeof useFindSeatsLazyQuery>;
export type FindSeatsQueryResult = Apollo.QueryResult<FindSeatsQuery, FindSeatsQueryVariables>;
export const UpdateSeatDocument = gql`
    mutation updateSeat($id: ID, $tags: [String], $disabled: Boolean) {
  updateSeat(id: $id, input: {tags: $tags, disabled: $disabled}) {
    success
  }
}
    `;
export type UpdateSeatMutationFn = Apollo.MutationFunction<UpdateSeatMutation, UpdateSeatMutationVariables>;

/**
 * __useUpdateSeatMutation__
 *
 * To run a mutation, you first call `useUpdateSeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSeatMutation, { data, loading, error }] = useUpdateSeatMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tags: // value for 'tags'
 *      disabled: // value for 'disabled'
 *   },
 * });
 */
export function useUpdateSeatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSeatMutation, UpdateSeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSeatMutation, UpdateSeatMutationVariables>(UpdateSeatDocument, options);
      }
export type UpdateSeatMutationHookResult = ReturnType<typeof useUpdateSeatMutation>;
export type UpdateSeatMutationResult = Apollo.MutationResult<UpdateSeatMutation>;
export type UpdateSeatMutationOptions = Apollo.BaseMutationOptions<UpdateSeatMutation, UpdateSeatMutationVariables>;
export const SetSeatsTagsDocument = gql`
    mutation setSeatsTags($ids: [ID], $tags: [String]) {
  setSeatsTags(ids: $ids, tags: $tags) {
    success
  }
}
    `;
export type SetSeatsTagsMutationFn = Apollo.MutationFunction<SetSeatsTagsMutation, SetSeatsTagsMutationVariables>;

/**
 * __useSetSeatsTagsMutation__
 *
 * To run a mutation, you first call `useSetSeatsTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetSeatsTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setSeatsTagsMutation, { data, loading, error }] = useSetSeatsTagsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useSetSeatsTagsMutation(baseOptions?: Apollo.MutationHookOptions<SetSeatsTagsMutation, SetSeatsTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSeatsTagsMutation, SetSeatsTagsMutationVariables>(SetSeatsTagsDocument, options);
      }
export type SetSeatsTagsMutationHookResult = ReturnType<typeof useSetSeatsTagsMutation>;
export type SetSeatsTagsMutationResult = Apollo.MutationResult<SetSeatsTagsMutation>;
export type SetSeatsTagsMutationOptions = Apollo.BaseMutationOptions<SetSeatsTagsMutation, SetSeatsTagsMutationVariables>;
export const PushSeatsTagsDocument = gql`
    mutation pushSeatsTags($ids: [ID], $tags: [String]) {
  pushSeatsTags(ids: $ids, tags: $tags) {
    success
  }
}
    `;
export type PushSeatsTagsMutationFn = Apollo.MutationFunction<PushSeatsTagsMutation, PushSeatsTagsMutationVariables>;

/**
 * __usePushSeatsTagsMutation__
 *
 * To run a mutation, you first call `usePushSeatsTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePushSeatsTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pushSeatsTagsMutation, { data, loading, error }] = usePushSeatsTagsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function usePushSeatsTagsMutation(baseOptions?: Apollo.MutationHookOptions<PushSeatsTagsMutation, PushSeatsTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PushSeatsTagsMutation, PushSeatsTagsMutationVariables>(PushSeatsTagsDocument, options);
      }
export type PushSeatsTagsMutationHookResult = ReturnType<typeof usePushSeatsTagsMutation>;
export type PushSeatsTagsMutationResult = Apollo.MutationResult<PushSeatsTagsMutation>;
export type PushSeatsTagsMutationOptions = Apollo.BaseMutationOptions<PushSeatsTagsMutation, PushSeatsTagsMutationVariables>;
export const PullSeatsTagsDocument = gql`
    mutation pullSeatsTags($ids: [ID], $tags: [String]) {
  pullSeatsTags(ids: $ids, tags: $tags) {
    success
  }
}
    `;
export type PullSeatsTagsMutationFn = Apollo.MutationFunction<PullSeatsTagsMutation, PullSeatsTagsMutationVariables>;

/**
 * __usePullSeatsTagsMutation__
 *
 * To run a mutation, you first call `usePullSeatsTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePullSeatsTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pullSeatsTagsMutation, { data, loading, error }] = usePullSeatsTagsMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function usePullSeatsTagsMutation(baseOptions?: Apollo.MutationHookOptions<PullSeatsTagsMutation, PullSeatsTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PullSeatsTagsMutation, PullSeatsTagsMutationVariables>(PullSeatsTagsDocument, options);
      }
export type PullSeatsTagsMutationHookResult = ReturnType<typeof usePullSeatsTagsMutation>;
export type PullSeatsTagsMutationResult = Apollo.MutationResult<PullSeatsTagsMutation>;
export type PullSeatsTagsMutationOptions = Apollo.BaseMutationOptions<PullSeatsTagsMutation, PullSeatsTagsMutationVariables>;
export const FindUserToSeatsDocument = gql`
    query FindUserToSeats($seat: ID, $user: ID, $startDate: Float, $endDate: Float) {
  list: findUserToSeats(
    seat: $seat
    user: $user
    startDate: $startDate
    endDate: $endDate
  ) {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;

/**
 * __useFindUserToSeatsQuery__
 *
 * To run a query within a React component, call `useFindUserToSeatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserToSeatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserToSeatsQuery({
 *   variables: {
 *      seat: // value for 'seat'
 *      user: // value for 'user'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useFindUserToSeatsQuery(baseOptions?: Apollo.QueryHookOptions<FindUserToSeatsQuery, FindUserToSeatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserToSeatsQuery, FindUserToSeatsQueryVariables>(FindUserToSeatsDocument, options);
      }
export function useFindUserToSeatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserToSeatsQuery, FindUserToSeatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserToSeatsQuery, FindUserToSeatsQueryVariables>(FindUserToSeatsDocument, options);
        }
export type FindUserToSeatsQueryHookResult = ReturnType<typeof useFindUserToSeatsQuery>;
export type FindUserToSeatsLazyQueryHookResult = ReturnType<typeof useFindUserToSeatsLazyQuery>;
export type FindUserToSeatsQueryResult = Apollo.QueryResult<FindUserToSeatsQuery, FindUserToSeatsQueryVariables>;
export const FindUserToSeatDocument = gql`
    query FindUserToSeat($_id: ID!) {
  userToSeat: findUserToSeat(_id: $_id) {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;

/**
 * __useFindUserToSeatQuery__
 *
 * To run a query within a React component, call `useFindUserToSeatQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserToSeatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserToSeatQuery({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useFindUserToSeatQuery(baseOptions: Apollo.QueryHookOptions<FindUserToSeatQuery, FindUserToSeatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserToSeatQuery, FindUserToSeatQueryVariables>(FindUserToSeatDocument, options);
      }
export function useFindUserToSeatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserToSeatQuery, FindUserToSeatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserToSeatQuery, FindUserToSeatQueryVariables>(FindUserToSeatDocument, options);
        }
export type FindUserToSeatQueryHookResult = ReturnType<typeof useFindUserToSeatQuery>;
export type FindUserToSeatLazyQueryHookResult = ReturnType<typeof useFindUserToSeatLazyQuery>;
export type FindUserToSeatQueryResult = Apollo.QueryResult<FindUserToSeatQuery, FindUserToSeatQueryVariables>;
export const CreateUserToSeatDocument = gql`
    mutation CreateUserToSeat($seat: ID!, $date: Float!) {
  userToSeat: createUserToSeat(input: {seat: $seat, date: $date}) {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;
export type CreateUserToSeatMutationFn = Apollo.MutationFunction<CreateUserToSeatMutation, CreateUserToSeatMutationVariables>;

/**
 * __useCreateUserToSeatMutation__
 *
 * To run a mutation, you first call `useCreateUserToSeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserToSeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserToSeatMutation, { data, loading, error }] = useCreateUserToSeatMutation({
 *   variables: {
 *      seat: // value for 'seat'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useCreateUserToSeatMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserToSeatMutation, CreateUserToSeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserToSeatMutation, CreateUserToSeatMutationVariables>(CreateUserToSeatDocument, options);
      }
export type CreateUserToSeatMutationHookResult = ReturnType<typeof useCreateUserToSeatMutation>;
export type CreateUserToSeatMutationResult = Apollo.MutationResult<CreateUserToSeatMutation>;
export type CreateUserToSeatMutationOptions = Apollo.BaseMutationOptions<CreateUserToSeatMutation, CreateUserToSeatMutationVariables>;
export const DeleteUserToSeatDocument = gql`
    mutation DeleteUserToSeat($seat: ID!, $date: Float!) {
  userToSeat: deleteUserToSeat(input: {seat: $seat, date: $date}) {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;
export type DeleteUserToSeatMutationFn = Apollo.MutationFunction<DeleteUserToSeatMutation, DeleteUserToSeatMutationVariables>;

/**
 * __useDeleteUserToSeatMutation__
 *
 * To run a mutation, you first call `useDeleteUserToSeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserToSeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserToSeatMutation, { data, loading, error }] = useDeleteUserToSeatMutation({
 *   variables: {
 *      seat: // value for 'seat'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useDeleteUserToSeatMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserToSeatMutation, DeleteUserToSeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserToSeatMutation, DeleteUserToSeatMutationVariables>(DeleteUserToSeatDocument, options);
      }
export type DeleteUserToSeatMutationHookResult = ReturnType<typeof useDeleteUserToSeatMutation>;
export type DeleteUserToSeatMutationResult = Apollo.MutationResult<DeleteUserToSeatMutation>;
export type DeleteUserToSeatMutationOptions = Apollo.BaseMutationOptions<DeleteUserToSeatMutation, DeleteUserToSeatMutationVariables>;
export const ToggleUserToSeatDocument = gql`
    mutation ToggleUserToSeat($seat: ID!, $date: Float!, $user: ID!) {
  userToSeat: toggleUserToSeat(input: {seat: $seat, date: $date, user: $user}) {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;
export type ToggleUserToSeatMutationFn = Apollo.MutationFunction<ToggleUserToSeatMutation, ToggleUserToSeatMutationVariables>;

/**
 * __useToggleUserToSeatMutation__
 *
 * To run a mutation, you first call `useToggleUserToSeatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleUserToSeatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleUserToSeatMutation, { data, loading, error }] = useToggleUserToSeatMutation({
 *   variables: {
 *      seat: // value for 'seat'
 *      date: // value for 'date'
 *      user: // value for 'user'
 *   },
 * });
 */
export function useToggleUserToSeatMutation(baseOptions?: Apollo.MutationHookOptions<ToggleUserToSeatMutation, ToggleUserToSeatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleUserToSeatMutation, ToggleUserToSeatMutationVariables>(ToggleUserToSeatDocument, options);
      }
export type ToggleUserToSeatMutationHookResult = ReturnType<typeof useToggleUserToSeatMutation>;
export type ToggleUserToSeatMutationResult = Apollo.MutationResult<ToggleUserToSeatMutation>;
export type ToggleUserToSeatMutationOptions = Apollo.BaseMutationOptions<ToggleUserToSeatMutation, ToggleUserToSeatMutationVariables>;
export const UserToSeatCreatedDocument = gql`
    subscription UserToSeatCreated {
  userToSeat: userToSeatCreated {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;

/**
 * __useUserToSeatCreatedSubscription__
 *
 * To run a query within a React component, call `useUserToSeatCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserToSeatCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserToSeatCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserToSeatCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserToSeatCreatedSubscription, UserToSeatCreatedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserToSeatCreatedSubscription, UserToSeatCreatedSubscriptionVariables>(UserToSeatCreatedDocument, options);
      }
export type UserToSeatCreatedSubscriptionHookResult = ReturnType<typeof useUserToSeatCreatedSubscription>;
export type UserToSeatCreatedSubscriptionResult = Apollo.SubscriptionResult<UserToSeatCreatedSubscription>;
export const UserToSeatDeletedDocument = gql`
    subscription UserToSeatDeleted {
  userToSeat: userToSeatDeleted {
    ...userToSeatFields
  }
}
    ${UserToSeatFieldsFragmentDoc}`;

/**
 * __useUserToSeatDeletedSubscription__
 *
 * To run a query within a React component, call `useUserToSeatDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserToSeatDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserToSeatDeletedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserToSeatDeletedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserToSeatDeletedSubscription, UserToSeatDeletedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserToSeatDeletedSubscription, UserToSeatDeletedSubscriptionVariables>(UserToSeatDeletedDocument, options);
      }
export type UserToSeatDeletedSubscriptionHookResult = ReturnType<typeof useUserToSeatDeletedSubscription>;
export type UserToSeatDeletedSubscriptionResult = Apollo.SubscriptionResult<UserToSeatDeletedSubscription>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "CommentObjectUnion": [
      "Comment",
      "News",
      "RetroMessage"
    ],
    "Document": [
      "Comment",
      "Dynamic",
      "Follow",
      "Hashtag",
      "Interest",
      "Like",
      "Organization",
      "Retro",
      "RetroListItem",
      "RetroMessage",
      "Schedule",
      "Seat",
      "Topic",
      "UserRole",
      "UserToOrganization",
      "UserToRole",
      "UserToSeat"
    ],
    "LikeObjectUnion": [
      "Comment",
      "Dynamic",
      "News",
      "RetroMessage"
    ]
  }
};
      export default result;
    