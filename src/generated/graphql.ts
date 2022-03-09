import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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
  RetroMessage = 'RetroMessage',
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

export type CreateUserInput = {
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['Int']>;
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
  RetroMessage = 'RetroMessage',
}

export type LoginUserInput = {
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment?: Maybe<Comment>;
  createDynamic?: Maybe<Dynamic>;
  createFollow?: Maybe<Follow>;
  createInterest?: Maybe<Interest>;
  createLike?: Maybe<Like>;
  createNews?: Maybe<News>;
  createOAuth?: Maybe<OAuth>;
  createRetro?: Maybe<Retro>;
  createRetroMessage?: Maybe<RetroMessage>;
  createUser?: Maybe<User>;
  deleteRetroMessage?: Maybe<RetroMessage>;
  likeRetroMessage?: Maybe<RetroMessage>;
  register?: Maybe<User>;
  replyComment?: Maybe<Reply>;
  updateRetroMessage?: Maybe<RetroMessage>;
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

export type MutationCreateRetroArgs = {
  input?: InputMaybe<CreateRetroInput>;
};

export type MutationCreateRetroMessageArgs = {
  input?: InputMaybe<CreateRetroMessageInput>;
};

export type MutationCreateUserArgs = {
  createUserInput?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteRetroMessageArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type MutationLikeRetroMessageArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  count?: InputMaybe<Scalars['Int']>;
};

export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterUserInput>;
};

export type MutationReplyCommentArgs = {
  input?: InputMaybe<ReplyCommentInput>;
};

export type MutationUpdateRetroMessageArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<UpdateRetroMessageInput>;
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

export type Query = {
  __typename?: 'Query';
  findComment?: Maybe<Comment>;
  findComments?: Maybe<Array<Maybe<Comment>>>;
  findDynamic?: Maybe<Dynamic>;
  findDynamics?: Maybe<Array<Maybe<Dynamic>>>;
  findFollow?: Maybe<Follow>;
  findFollows?: Maybe<Array<Maybe<Follow>>>;
  findInterest?: Maybe<Interest>;
  findInterests?: Maybe<Array<Maybe<Interest>>>;
  findLike?: Maybe<Like>;
  findLikes?: Maybe<Array<Maybe<Like>>>;
  findRetro?: Maybe<Retro>;
  findRetroMessage?: Maybe<RetroMessage>;
  findRetroMessages?: Maybe<Array<Maybe<RetroMessage>>>;
  findRetros?: Maybe<Array<Maybe<RetroListItem>>>;
  findUser?: Maybe<User>;
  findUserInfo?: Maybe<User>;
  findUsers?: Maybe<Array<Maybe<User>>>;
  login?: Maybe<UserWithToken>;
  news?: Maybe<News>;
  newsList?: Maybe<Array<Maybe<News>>>;
  oauth?: Maybe<OAuth>;
  oauths?: Maybe<Array<Maybe<OAuth>>>;
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

export type QueryFindInterestArgs = {
  _id: Scalars['ID'];
};

export type QueryFindLikeArgs = {
  _id: Scalars['ID'];
};

export type QueryFindLikesArgs = {
  object: Scalars['ID'];
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

export type QueryFindUserArgs = {
  _id: Scalars['String'];
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
  Normal = 'NORMAL',
}

export enum RetroMessageType {
  Happy = 'HAPPY',
  Todo = 'TODO',
  Unhappy = 'UNHAPPY',
  Wonderring = 'WONDERRING',
}

export enum Role {
  Admin = 'ADMIN',
  Reviewer = 'REVIEWER',
  Unknown = 'UNKNOWN',
  User = 'USER',
}

export type Subscription = {
  __typename?: 'Subscription';
  commentCreated?: Maybe<Comment>;
  dynamicCreated?: Maybe<Dynamic>;
  followCreated?: Maybe<Follow>;
  interestCreated?: Maybe<Interest>;
  likeCreated?: Maybe<Like>;
  newsCreated?: Maybe<News>;
  retroCreated?: Maybe<Retro>;
  retroMessageCreated?: Maybe<RetroMessage>;
  retroMessageDeleted?: Maybe<RetroMessage>;
  retroMessageLiked?: Maybe<RetroMessage>;
  retroMessageUpdated?: Maybe<RetroMessage>;
};

export type UpdateRetroMessageInput = {
  anonymous?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  pictures?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<RetroMessageStatus>;
  type?: InputMaybe<RetroMessageType>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  avatarUrl?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  sex?: Maybe<Scalars['Int']>;
  sign?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  token: Scalars['String'];
  user: User;
};

export type CommentFieldsFragment = {
  __typename?: 'Comment';
  _id: string;
  content?: string | null | undefined;
  createdAt?: string | null | undefined;
  likeCount?: number | null | undefined;
  likeStatus?: boolean | null | undefined;
  user?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        username?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
  comments?:
    | Array<
        | {
            __typename?: 'Reply';
            _id: string;
            content?: string | null | undefined;
            createdAt?: string | null | undefined;
            likeCount?: number | null | undefined;
            likeStatus?: boolean | null | undefined;
            user?:
              | {
                  __typename?: 'User';
                  _id: string;
                  nickname?: string | null | undefined;
                  username?: string | null | undefined;
                  avatarUrl?: string | null | undefined;
                }
              | null
              | undefined;
            commentTo?:
              | { __typename?: 'Comment'; _id: string }
              | null
              | undefined;
            replyTo?:
              | {
                  __typename?: 'Comment';
                  _id: string;
                  user?:
                    | {
                        __typename?: 'User';
                        _id: string;
                        nickname?: string | null | undefined;
                        username?: string | null | undefined;
                        avatarUrl?: string | null | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type ReplyFieldsFragment = {
  __typename?: 'Reply';
  _id: string;
  content?: string | null | undefined;
  createdAt?: string | null | undefined;
  likeCount?: number | null | undefined;
  likeStatus?: boolean | null | undefined;
  user?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        username?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
  commentTo?: { __typename?: 'Comment'; _id: string } | null | undefined;
  replyTo?:
    | {
        __typename?: 'Comment';
        _id: string;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type FindCommentsQueryVariables = Exact<{
  object: Scalars['ID'];
}>;

export type FindCommentsQuery = {
  __typename?: 'Query';
  findComments?:
    | Array<
        | {
            __typename?: 'Comment';
            _id: string;
            content?: string | null | undefined;
            createdAt?: string | null | undefined;
            likeCount?: number | null | undefined;
            likeStatus?: boolean | null | undefined;
            user?:
              | {
                  __typename?: 'User';
                  _id: string;
                  nickname?: string | null | undefined;
                  username?: string | null | undefined;
                  avatarUrl?: string | null | undefined;
                }
              | null
              | undefined;
            comments?:
              | Array<
                  | {
                      __typename?: 'Reply';
                      _id: string;
                      content?: string | null | undefined;
                      createdAt?: string | null | undefined;
                      likeCount?: number | null | undefined;
                      likeStatus?: boolean | null | undefined;
                      user?:
                        | {
                            __typename?: 'User';
                            _id: string;
                            nickname?: string | null | undefined;
                            username?: string | null | undefined;
                            avatarUrl?: string | null | undefined;
                          }
                        | null
                        | undefined;
                      commentTo?:
                        | { __typename?: 'Comment'; _id: string }
                        | null
                        | undefined;
                      replyTo?:
                        | {
                            __typename?: 'Comment';
                            _id: string;
                            user?:
                              | {
                                  __typename?: 'User';
                                  _id: string;
                                  nickname?: string | null | undefined;
                                  username?: string | null | undefined;
                                  avatarUrl?: string | null | undefined;
                                }
                              | null
                              | undefined;
                          }
                        | null
                        | undefined;
                    }
                  | null
                  | undefined
                >
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type FindCommentQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type FindCommentQuery = {
  __typename?: 'Query';
  findComment?:
    | {
        __typename?: 'Comment';
        _id: string;
        content?: string | null | undefined;
        createdAt?: string | null | undefined;
        likeCount?: number | null | undefined;
        likeStatus?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Reply';
                  _id: string;
                  content?: string | null | undefined;
                  createdAt?: string | null | undefined;
                  likeCount?: number | null | undefined;
                  likeStatus?: boolean | null | undefined;
                  user?:
                    | {
                        __typename?: 'User';
                        _id: string;
                        nickname?: string | null | undefined;
                        username?: string | null | undefined;
                        avatarUrl?: string | null | undefined;
                      }
                    | null
                    | undefined;
                  commentTo?:
                    | { __typename?: 'Comment'; _id: string }
                    | null
                    | undefined;
                  replyTo?:
                    | {
                        __typename?: 'Comment';
                        _id: string;
                        user?:
                          | {
                              __typename?: 'User';
                              _id: string;
                              nickname?: string | null | undefined;
                              username?: string | null | undefined;
                              avatarUrl?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type CreateCommentMutationVariables = Exact<{
  object: Scalars['ID'];
  objectModel: CommentObjectUnionModel;
  content: Scalars['String'];
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment?:
    | {
        __typename?: 'Comment';
        _id: string;
        content?: string | null | undefined;
        createdAt?: string | null | undefined;
        likeCount?: number | null | undefined;
        likeStatus?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
        comments?:
          | Array<
              | {
                  __typename?: 'Reply';
                  _id: string;
                  content?: string | null | undefined;
                  createdAt?: string | null | undefined;
                  likeCount?: number | null | undefined;
                  likeStatus?: boolean | null | undefined;
                  user?:
                    | {
                        __typename?: 'User';
                        _id: string;
                        nickname?: string | null | undefined;
                        username?: string | null | undefined;
                        avatarUrl?: string | null | undefined;
                      }
                    | null
                    | undefined;
                  commentTo?:
                    | { __typename?: 'Comment'; _id: string }
                    | null
                    | undefined;
                  replyTo?:
                    | {
                        __typename?: 'Comment';
                        _id: string;
                        user?:
                          | {
                              __typename?: 'User';
                              _id: string;
                              nickname?: string | null | undefined;
                              username?: string | null | undefined;
                              avatarUrl?: string | null | undefined;
                            }
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ReplyCommentMutationVariables = Exact<{
  to: Scalars['ID'];
  content: Scalars['String'];
}>;

export type ReplyCommentMutation = {
  __typename?: 'Mutation';
  replyComment?:
    | {
        __typename?: 'Reply';
        _id: string;
        content?: string | null | undefined;
        createdAt?: string | null | undefined;
        likeCount?: number | null | undefined;
        likeStatus?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
        commentTo?: { __typename?: 'Comment'; _id: string } | null | undefined;
        replyTo?:
          | {
              __typename?: 'Comment';
              _id: string;
              user?:
                | {
                    __typename?: 'User';
                    _id: string;
                    nickname?: string | null | undefined;
                    username?: string | null | undefined;
                    avatarUrl?: string | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type DynamicFieldsFragment = {
  __typename?: 'Dynamic';
  _id: string;
  createdAt: string;
  content?: string | null | undefined;
  pictures?: Array<string> | null | undefined;
  likeCount?: number | null | undefined;
  likeStatus?: boolean | null | undefined;
  commentCount?: number | null | undefined;
  shareCount?: number | null | undefined;
  user: {
    __typename?: 'User';
    _id: string;
    nickname?: string | null | undefined;
    username?: string | null | undefined;
    avatarUrl?: string | null | undefined;
  };
};

export type FindDynamicsQueryVariables = Exact<{ [key: string]: never }>;

export type FindDynamicsQuery = {
  __typename?: 'Query';
  findDynamics?:
    | Array<
        | {
            __typename?: 'Dynamic';
            _id: string;
            createdAt: string;
            content?: string | null | undefined;
            pictures?: Array<string> | null | undefined;
            likeCount?: number | null | undefined;
            likeStatus?: boolean | null | undefined;
            commentCount?: number | null | undefined;
            shareCount?: number | null | undefined;
            user: {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            };
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type FindDynamicQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type FindDynamicQuery = {
  __typename?: 'Query';
  findDynamic?:
    | {
        __typename?: 'Dynamic';
        _id: string;
        createdAt: string;
        content?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        likeCount?: number | null | undefined;
        likeStatus?: boolean | null | undefined;
        commentCount?: number | null | undefined;
        shareCount?: number | null | undefined;
        user: {
          __typename?: 'User';
          _id: string;
          nickname?: string | null | undefined;
          username?: string | null | undefined;
          avatarUrl?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

export type CreateDynamicMutationVariables = Exact<{
  content: Scalars['String'];
  pictures?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type CreateDynamicMutation = {
  __typename?: 'Mutation';
  createDynamic?:
    | {
        __typename?: 'Dynamic';
        _id: string;
        createdAt: string;
        content?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        likeCount?: number | null | undefined;
        likeStatus?: boolean | null | undefined;
        commentCount?: number | null | undefined;
        shareCount?: number | null | undefined;
        user: {
          __typename?: 'User';
          _id: string;
          nickname?: string | null | undefined;
          username?: string | null | undefined;
          avatarUrl?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

export type LikeFieldsFragment = { __typename?: 'Like'; _id: string };

export type FindLikesQueryVariables = Exact<{
  object: Scalars['ID'];
}>;

export type FindLikesQuery = {
  __typename?: 'Query';
  findLikes?:
    | Array<{ __typename?: 'Like'; _id: string } | null | undefined>
    | null
    | undefined;
};

export type FindLikeQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type FindLikeQuery = {
  __typename?: 'Query';
  findLike?: { __typename?: 'Like'; _id: string } | null | undefined;
};

export type CreateLikeMutationVariables = Exact<{
  object: Scalars['ID'];
  objectModel: LikeObjectUnionModel;
}>;

export type CreateLikeMutation = {
  __typename?: 'Mutation';
  createLike?: { __typename?: 'Like'; _id: string } | null | undefined;
};

export type RetroFieldsFragment = {
  __typename: 'Retro';
  _id: string;
  title?: string | null | undefined;
  content?: string | null | undefined;
  date?: string | null | undefined;
  anonymous?: boolean | null | undefined;
  user?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        username?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
};

export type RetroListItemFieldsFragment = {
  __typename: 'RetroListItem';
  _id: string;
  title?: string | null | undefined;
  content?: string | null | undefined;
  date?: string | null | undefined;
  anonymous?: boolean | null | undefined;
  likeCount?: number | null | undefined;
  happyCount?: number | null | undefined;
  unhappyCount?: number | null | undefined;
  wonderringCount?: number | null | undefined;
  todoCount?: number | null | undefined;
  user?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
};

export type FindRetrosQueryVariables = Exact<{ [key: string]: never }>;

export type FindRetrosQuery = {
  __typename?: 'Query';
  findRetros?:
    | Array<
        | {
            __typename: 'RetroListItem';
            _id: string;
            title?: string | null | undefined;
            content?: string | null | undefined;
            date?: string | null | undefined;
            anonymous?: boolean | null | undefined;
            likeCount?: number | null | undefined;
            happyCount?: number | null | undefined;
            unhappyCount?: number | null | undefined;
            wonderringCount?: number | null | undefined;
            todoCount?: number | null | undefined;
            user?:
              | {
                  __typename?: 'User';
                  _id: string;
                  nickname?: string | null | undefined;
                  avatarUrl?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type FindRetroQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type FindRetroQuery = {
  __typename?: 'Query';
  findRetro?:
    | {
        __typename: 'Retro';
        _id: string;
        title?: string | null | undefined;
        content?: string | null | undefined;
        date?: string | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type CreateRetroMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  date: Scalars['String'];
  anonymous?: InputMaybe<Scalars['Boolean']>;
}>;

export type CreateRetroMutation = {
  __typename?: 'Mutation';
  createRetro?:
    | {
        __typename: 'Retro';
        _id: string;
        title?: string | null | undefined;
        content?: string | null | undefined;
        date?: string | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RetroCreatedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type RetroCreatedSubscription = {
  __typename?: 'Subscription';
  retroCreated?:
    | {
        __typename: 'Retro';
        _id: string;
        title?: string | null | undefined;
        content?: string | null | undefined;
        date?: string | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RetroMessageFieldsFragment = {
  __typename?: 'RetroMessage';
  _id: string;
  content?: string | null | undefined;
  status?: RetroMessageStatus | null | undefined;
  type?: RetroMessageType | null | undefined;
  like?: number | null | undefined;
  createdAt?: string | null | undefined;
  pictures?: Array<string> | null | undefined;
  anonymous?: boolean | null | undefined;
  user?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        username?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
};

export type FindRetroSectionQueryVariables = Exact<{
  retro: Scalars['ID'];
}>;

export type FindRetroSectionQuery = {
  __typename?: 'Query';
  retroMessages?:
    | Array<
        | {
            __typename?: 'RetroMessage';
            _id: string;
            content?: string | null | undefined;
            status?: RetroMessageStatus | null | undefined;
            type?: RetroMessageType | null | undefined;
            like?: number | null | undefined;
            createdAt?: string | null | undefined;
            pictures?: Array<string> | null | undefined;
            anonymous?: boolean | null | undefined;
            user?:
              | {
                  __typename?: 'User';
                  _id: string;
                  nickname?: string | null | undefined;
                  username?: string | null | undefined;
                  avatarUrl?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
  retro?:
    | {
        __typename: 'Retro';
        _id: string;
        title?: string | null | undefined;
        content?: string | null | undefined;
        date?: string | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  userInfo?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        username?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
};

export type FindRetroMessagesQueryVariables = Exact<{
  retro: Scalars['ID'];
}>;

export type FindRetroMessagesQuery = {
  __typename?: 'Query';
  retroMessages?:
    | Array<
        | {
            __typename?: 'RetroMessage';
            _id: string;
            content?: string | null | undefined;
            status?: RetroMessageStatus | null | undefined;
            type?: RetroMessageType | null | undefined;
            like?: number | null | undefined;
            createdAt?: string | null | undefined;
            pictures?: Array<string> | null | undefined;
            anonymous?: boolean | null | undefined;
            user?:
              | {
                  __typename?: 'User';
                  _id: string;
                  nickname?: string | null | undefined;
                  username?: string | null | undefined;
                  avatarUrl?: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type FindRetroMessageQueryVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type FindRetroMessageQuery = {
  __typename?: 'Query';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type CreateRetroMessageMutationVariables = Exact<{
  retro: Scalars['ID'];
  content: Scalars['String'];
  type: RetroMessageType;
  pictures?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  anonymous?: InputMaybe<Scalars['Boolean']>;
}>;

export type CreateRetroMessageMutation = {
  __typename?: 'Mutation';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UpdateRetroMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<RetroMessageType>;
  status?: InputMaybe<RetroMessageStatus>;
  pictures?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  anonymous?: InputMaybe<Scalars['Boolean']>;
}>;

export type UpdateRetroMessageMutation = {
  __typename?: 'Mutation';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type LikeRetroMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
  count?: InputMaybe<Scalars['Int']>;
}>;

export type LikeRetroMessageMutation = {
  __typename?: 'Mutation';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type DeleteRetroMessageMutationVariables = Exact<{
  _id: Scalars['ID'];
}>;

export type DeleteRetroMessageMutation = {
  __typename?: 'Mutation';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RetroMessageCreatedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type RetroMessageCreatedSubscription = {
  __typename?: 'Subscription';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RetroMessageUpdatedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type RetroMessageUpdatedSubscription = {
  __typename?: 'Subscription';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RetroMessageLikedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type RetroMessageLikedSubscription = {
  __typename?: 'Subscription';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RetroMessageDeletedSubscriptionVariables = Exact<{
  [key: string]: never;
}>;

export type RetroMessageDeletedSubscription = {
  __typename?: 'Subscription';
  retroMessage?:
    | {
        __typename?: 'RetroMessage';
        _id: string;
        content?: string | null | undefined;
        status?: RetroMessageStatus | null | undefined;
        type?: RetroMessageType | null | undefined;
        like?: number | null | undefined;
        createdAt?: string | null | undefined;
        pictures?: Array<string> | null | undefined;
        anonymous?: boolean | null | undefined;
        user?:
          | {
              __typename?: 'User';
              _id: string;
              nickname?: string | null | undefined;
              username?: string | null | undefined;
              avatarUrl?: string | null | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type UserFieldsFragment = {
  __typename: 'User';
  _id: string;
  nickname?: string | null | undefined;
  username?: string | null | undefined;
  avatarUrl?: string | null | undefined;
};

export type FindUsersQueryVariables = Exact<{ [key: string]: never }>;

export type FindUsersQuery = {
  __typename?: 'Query';
  findUsers?:
    | Array<
        | {
            __typename?: 'User';
            _id: string;
            nickname?: string | null | undefined;
            username?: string | null | undefined;
            avatarUrl?: string | null | undefined;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type FindUserInfoQueryVariables = Exact<{ [key: string]: never }>;

export type FindUserInfoQuery = {
  __typename?: 'Query';
  findUserInfo?:
    | {
        __typename?: 'User';
        _id: string;
        nickname?: string | null | undefined;
        username?: string | null | undefined;
        avatarUrl?: string | null | undefined;
      }
    | null
    | undefined;
};

export type LoginQueryVariables = Exact<{
  input?: InputMaybe<LoginUserInput>;
}>;

export type LoginQuery = {
  __typename?: 'Query';
  login?:
    | {
        __typename?: 'UserWithToken';
        token: string;
        user: {
          __typename?: 'User';
          _id: string;
          nickname?: string | null | undefined;
          username?: string | null | undefined;
          avatarUrl?: string | null | undefined;
        };
      }
    | null
    | undefined;
};

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
export const UserFieldsFragmentDoc = gql`
  fragment userFields on User {
    __typename
    _id
    nickname
    username
    avatarUrl
  }
`;
export const FindCommentsDocument = gql`
  query FindComments($object: ID!) {
    findComments(object: $object) {
      ...commentFields
    }
  }
  ${CommentFieldsFragmentDoc}
`;

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
export function useFindCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindCommentsQuery,
    FindCommentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindCommentsQuery, FindCommentsQueryVariables>(
    FindCommentsDocument,
    options,
  );
}
export function useFindCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindCommentsQuery,
    FindCommentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindCommentsQuery, FindCommentsQueryVariables>(
    FindCommentsDocument,
    options,
  );
}
export type FindCommentsQueryHookResult = ReturnType<
  typeof useFindCommentsQuery
>;
export type FindCommentsLazyQueryHookResult = ReturnType<
  typeof useFindCommentsLazyQuery
>;
export type FindCommentsQueryResult = Apollo.QueryResult<
  FindCommentsQuery,
  FindCommentsQueryVariables
>;
export const FindCommentDocument = gql`
  query FindComment($_id: ID!) {
    findComment(_id: $_id) {
      ...commentFields
    }
  }
  ${CommentFieldsFragmentDoc}
`;

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
export function useFindCommentQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindCommentQuery,
    FindCommentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindCommentQuery, FindCommentQueryVariables>(
    FindCommentDocument,
    options,
  );
}
export function useFindCommentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindCommentQuery,
    FindCommentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindCommentQuery, FindCommentQueryVariables>(
    FindCommentDocument,
    options,
  );
}
export type FindCommentQueryHookResult = ReturnType<typeof useFindCommentQuery>;
export type FindCommentLazyQueryHookResult = ReturnType<
  typeof useFindCommentLazyQuery
>;
export type FindCommentQueryResult = Apollo.QueryResult<
  FindCommentQuery,
  FindCommentQueryVariables
>;
export const CreateCommentDocument = gql`
  mutation CreateComment(
    $object: ID!
    $objectModel: CommentObjectUnionModel!
    $content: String!
  ) {
    createComment(
      input: { object: $object, objectModel: $objectModel, content: $content }
    ) {
      ...commentFields
    }
  }
  ${CommentFieldsFragmentDoc}
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;

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
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCommentMutation,
    CreateCommentMutationVariables
  >(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<
  typeof useCreateCommentMutation
>;
export type CreateCommentMutationResult =
  Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const ReplyCommentDocument = gql`
  mutation ReplyComment($to: ID!, $content: String!) {
    replyComment(input: { to: $to, content: $content }) {
      ...replyFields
    }
  }
  ${ReplyFieldsFragmentDoc}
`;
export type ReplyCommentMutationFn = Apollo.MutationFunction<
  ReplyCommentMutation,
  ReplyCommentMutationVariables
>;

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
export function useReplyCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReplyCommentMutation,
    ReplyCommentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ReplyCommentMutation,
    ReplyCommentMutationVariables
  >(ReplyCommentDocument, options);
}
export type ReplyCommentMutationHookResult = ReturnType<
  typeof useReplyCommentMutation
>;
export type ReplyCommentMutationResult =
  Apollo.MutationResult<ReplyCommentMutation>;
export type ReplyCommentMutationOptions = Apollo.BaseMutationOptions<
  ReplyCommentMutation,
  ReplyCommentMutationVariables
>;
export const FindDynamicsDocument = gql`
  query FindDynamics {
    findDynamics {
      ...dynamicFields
    }
  }
  ${DynamicFieldsFragmentDoc}
`;

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
export function useFindDynamicsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindDynamicsQuery,
    FindDynamicsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindDynamicsQuery, FindDynamicsQueryVariables>(
    FindDynamicsDocument,
    options,
  );
}
export function useFindDynamicsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDynamicsQuery,
    FindDynamicsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindDynamicsQuery, FindDynamicsQueryVariables>(
    FindDynamicsDocument,
    options,
  );
}
export type FindDynamicsQueryHookResult = ReturnType<
  typeof useFindDynamicsQuery
>;
export type FindDynamicsLazyQueryHookResult = ReturnType<
  typeof useFindDynamicsLazyQuery
>;
export type FindDynamicsQueryResult = Apollo.QueryResult<
  FindDynamicsQuery,
  FindDynamicsQueryVariables
>;
export const FindDynamicDocument = gql`
  query FindDynamic($_id: ID!) {
    findDynamic(_id: $_id) {
      ...dynamicFields
    }
  }
  ${DynamicFieldsFragmentDoc}
`;

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
export function useFindDynamicQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindDynamicQuery,
    FindDynamicQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindDynamicQuery, FindDynamicQueryVariables>(
    FindDynamicDocument,
    options,
  );
}
export function useFindDynamicLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindDynamicQuery,
    FindDynamicQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindDynamicQuery, FindDynamicQueryVariables>(
    FindDynamicDocument,
    options,
  );
}
export type FindDynamicQueryHookResult = ReturnType<typeof useFindDynamicQuery>;
export type FindDynamicLazyQueryHookResult = ReturnType<
  typeof useFindDynamicLazyQuery
>;
export type FindDynamicQueryResult = Apollo.QueryResult<
  FindDynamicQuery,
  FindDynamicQueryVariables
>;
export const CreateDynamicDocument = gql`
  mutation CreateDynamic($content: String!, $pictures: [String!]) {
    createDynamic(input: { content: $content, pictures: $pictures }) {
      ...dynamicFields
    }
  }
  ${DynamicFieldsFragmentDoc}
`;
export type CreateDynamicMutationFn = Apollo.MutationFunction<
  CreateDynamicMutation,
  CreateDynamicMutationVariables
>;

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
export function useCreateDynamicMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDynamicMutation,
    CreateDynamicMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDynamicMutation,
    CreateDynamicMutationVariables
  >(CreateDynamicDocument, options);
}
export type CreateDynamicMutationHookResult = ReturnType<
  typeof useCreateDynamicMutation
>;
export type CreateDynamicMutationResult =
  Apollo.MutationResult<CreateDynamicMutation>;
export type CreateDynamicMutationOptions = Apollo.BaseMutationOptions<
  CreateDynamicMutation,
  CreateDynamicMutationVariables
>;
export const FindLikesDocument = gql`
  query FindLikes($object: ID!) {
    findLikes(object: $object) {
      ...likeFields
    }
  }
  ${LikeFieldsFragmentDoc}
`;

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
export function useFindLikesQuery(
  baseOptions: Apollo.QueryHookOptions<FindLikesQuery, FindLikesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindLikesQuery, FindLikesQueryVariables>(
    FindLikesDocument,
    options,
  );
}
export function useFindLikesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindLikesQuery,
    FindLikesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindLikesQuery, FindLikesQueryVariables>(
    FindLikesDocument,
    options,
  );
}
export type FindLikesQueryHookResult = ReturnType<typeof useFindLikesQuery>;
export type FindLikesLazyQueryHookResult = ReturnType<
  typeof useFindLikesLazyQuery
>;
export type FindLikesQueryResult = Apollo.QueryResult<
  FindLikesQuery,
  FindLikesQueryVariables
>;
export const FindLikeDocument = gql`
  query FindLike($_id: ID!) {
    findLike(_id: $_id) {
      ...likeFields
    }
  }
  ${LikeFieldsFragmentDoc}
`;

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
export function useFindLikeQuery(
  baseOptions: Apollo.QueryHookOptions<FindLikeQuery, FindLikeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindLikeQuery, FindLikeQueryVariables>(
    FindLikeDocument,
    options,
  );
}
export function useFindLikeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindLikeQuery,
    FindLikeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindLikeQuery, FindLikeQueryVariables>(
    FindLikeDocument,
    options,
  );
}
export type FindLikeQueryHookResult = ReturnType<typeof useFindLikeQuery>;
export type FindLikeLazyQueryHookResult = ReturnType<
  typeof useFindLikeLazyQuery
>;
export type FindLikeQueryResult = Apollo.QueryResult<
  FindLikeQuery,
  FindLikeQueryVariables
>;
export const CreateLikeDocument = gql`
  mutation CreateLike($object: ID!, $objectModel: LikeObjectUnionModel!) {
    createLike(input: { object: $object, objectModel: $objectModel }) {
      ...likeFields
    }
  }
  ${LikeFieldsFragmentDoc}
`;
export type CreateLikeMutationFn = Apollo.MutationFunction<
  CreateLikeMutation,
  CreateLikeMutationVariables
>;

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
export function useCreateLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateLikeMutation,
    CreateLikeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateLikeMutation, CreateLikeMutationVariables>(
    CreateLikeDocument,
    options,
  );
}
export type CreateLikeMutationHookResult = ReturnType<
  typeof useCreateLikeMutation
>;
export type CreateLikeMutationResult =
  Apollo.MutationResult<CreateLikeMutation>;
export type CreateLikeMutationOptions = Apollo.BaseMutationOptions<
  CreateLikeMutation,
  CreateLikeMutationVariables
>;
export const FindRetrosDocument = gql`
  query FindRetros {
    findRetros {
      ...retroListItemFields
    }
  }
  ${RetroListItemFieldsFragmentDoc}
`;

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
 *   },
 * });
 */
export function useFindRetrosQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindRetrosQuery,
    FindRetrosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindRetrosQuery, FindRetrosQueryVariables>(
    FindRetrosDocument,
    options,
  );
}
export function useFindRetrosLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRetrosQuery,
    FindRetrosQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindRetrosQuery, FindRetrosQueryVariables>(
    FindRetrosDocument,
    options,
  );
}
export type FindRetrosQueryHookResult = ReturnType<typeof useFindRetrosQuery>;
export type FindRetrosLazyQueryHookResult = ReturnType<
  typeof useFindRetrosLazyQuery
>;
export type FindRetrosQueryResult = Apollo.QueryResult<
  FindRetrosQuery,
  FindRetrosQueryVariables
>;
export const FindRetroDocument = gql`
  query FindRetro($_id: ID!) {
    findRetro(_id: $_id) {
      ...retroFields
    }
  }
  ${RetroFieldsFragmentDoc}
`;

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
export function useFindRetroQuery(
  baseOptions: Apollo.QueryHookOptions<FindRetroQuery, FindRetroQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindRetroQuery, FindRetroQueryVariables>(
    FindRetroDocument,
    options,
  );
}
export function useFindRetroLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRetroQuery,
    FindRetroQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindRetroQuery, FindRetroQueryVariables>(
    FindRetroDocument,
    options,
  );
}
export type FindRetroQueryHookResult = ReturnType<typeof useFindRetroQuery>;
export type FindRetroLazyQueryHookResult = ReturnType<
  typeof useFindRetroLazyQuery
>;
export type FindRetroQueryResult = Apollo.QueryResult<
  FindRetroQuery,
  FindRetroQueryVariables
>;
export const CreateRetroDocument = gql`
  mutation CreateRetro(
    $title: String
    $content: String
    $date: String!
    $anonymous: Boolean
  ) {
    createRetro(
      input: {
        title: $title
        content: $content
        date: $date
        anonymous: $anonymous
      }
    ) {
      ...retroFields
    }
  }
  ${RetroFieldsFragmentDoc}
`;
export type CreateRetroMutationFn = Apollo.MutationFunction<
  CreateRetroMutation,
  CreateRetroMutationVariables
>;

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
export function useCreateRetroMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRetroMutation,
    CreateRetroMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRetroMutation, CreateRetroMutationVariables>(
    CreateRetroDocument,
    options,
  );
}
export type CreateRetroMutationHookResult = ReturnType<
  typeof useCreateRetroMutation
>;
export type CreateRetroMutationResult =
  Apollo.MutationResult<CreateRetroMutation>;
export type CreateRetroMutationOptions = Apollo.BaseMutationOptions<
  CreateRetroMutation,
  CreateRetroMutationVariables
>;
export const RetroCreatedDocument = gql`
  subscription RetroCreated {
    retroCreated {
      ...retroFields
    }
  }
  ${RetroFieldsFragmentDoc}
`;

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
export function useRetroCreatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    RetroCreatedSubscription,
    RetroCreatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    RetroCreatedSubscription,
    RetroCreatedSubscriptionVariables
  >(RetroCreatedDocument, options);
}
export type RetroCreatedSubscriptionHookResult = ReturnType<
  typeof useRetroCreatedSubscription
>;
export type RetroCreatedSubscriptionResult =
  Apollo.SubscriptionResult<RetroCreatedSubscription>;
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
  ${RetroFieldsFragmentDoc}
`;

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
export function useFindRetroSectionQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindRetroSectionQuery,
    FindRetroSectionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindRetroSectionQuery, FindRetroSectionQueryVariables>(
    FindRetroSectionDocument,
    options,
  );
}
export function useFindRetroSectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRetroSectionQuery,
    FindRetroSectionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindRetroSectionQuery,
    FindRetroSectionQueryVariables
  >(FindRetroSectionDocument, options);
}
export type FindRetroSectionQueryHookResult = ReturnType<
  typeof useFindRetroSectionQuery
>;
export type FindRetroSectionLazyQueryHookResult = ReturnType<
  typeof useFindRetroSectionLazyQuery
>;
export type FindRetroSectionQueryResult = Apollo.QueryResult<
  FindRetroSectionQuery,
  FindRetroSectionQueryVariables
>;
export const FindRetroMessagesDocument = gql`
  query FindRetroMessages($retro: ID!) {
    retroMessages: findRetroMessages(retro: $retro) {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;

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
export function useFindRetroMessagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindRetroMessagesQuery,
    FindRetroMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindRetroMessagesQuery,
    FindRetroMessagesQueryVariables
  >(FindRetroMessagesDocument, options);
}
export function useFindRetroMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRetroMessagesQuery,
    FindRetroMessagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindRetroMessagesQuery,
    FindRetroMessagesQueryVariables
  >(FindRetroMessagesDocument, options);
}
export type FindRetroMessagesQueryHookResult = ReturnType<
  typeof useFindRetroMessagesQuery
>;
export type FindRetroMessagesLazyQueryHookResult = ReturnType<
  typeof useFindRetroMessagesLazyQuery
>;
export type FindRetroMessagesQueryResult = Apollo.QueryResult<
  FindRetroMessagesQuery,
  FindRetroMessagesQueryVariables
>;
export const FindRetroMessageDocument = gql`
  query FindRetroMessage($_id: ID!) {
    retroMessage: findRetroMessage(_id: $_id) {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;

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
export function useFindRetroMessageQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindRetroMessageQuery,
    FindRetroMessageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindRetroMessageQuery, FindRetroMessageQueryVariables>(
    FindRetroMessageDocument,
    options,
  );
}
export function useFindRetroMessageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindRetroMessageQuery,
    FindRetroMessageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindRetroMessageQuery,
    FindRetroMessageQueryVariables
  >(FindRetroMessageDocument, options);
}
export type FindRetroMessageQueryHookResult = ReturnType<
  typeof useFindRetroMessageQuery
>;
export type FindRetroMessageLazyQueryHookResult = ReturnType<
  typeof useFindRetroMessageLazyQuery
>;
export type FindRetroMessageQueryResult = Apollo.QueryResult<
  FindRetroMessageQuery,
  FindRetroMessageQueryVariables
>;
export const CreateRetroMessageDocument = gql`
  mutation CreateRetroMessage(
    $retro: ID!
    $content: String!
    $type: RetroMessageType!
    $pictures: [String!]
    $anonymous: Boolean
  ) {
    retroMessage: createRetroMessage(
      input: {
        retro: $retro
        content: $content
        type: $type
        pictures: $pictures
        anonymous: $anonymous
      }
    ) {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;
export type CreateRetroMessageMutationFn = Apollo.MutationFunction<
  CreateRetroMessageMutation,
  CreateRetroMessageMutationVariables
>;

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
export function useCreateRetroMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRetroMessageMutation,
    CreateRetroMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateRetroMessageMutation,
    CreateRetroMessageMutationVariables
  >(CreateRetroMessageDocument, options);
}
export type CreateRetroMessageMutationHookResult = ReturnType<
  typeof useCreateRetroMessageMutation
>;
export type CreateRetroMessageMutationResult =
  Apollo.MutationResult<CreateRetroMessageMutation>;
export type CreateRetroMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateRetroMessageMutation,
  CreateRetroMessageMutationVariables
>;
export const UpdateRetroMessageDocument = gql`
  mutation UpdateRetroMessage(
    $_id: ID!
    $content: String
    $type: RetroMessageType
    $status: RetroMessageStatus
    $pictures: [String!]
    $anonymous: Boolean
  ) {
    retroMessage: updateRetroMessage(
      _id: $_id
      input: {
        content: $content
        type: $type
        status: $status
        pictures: $pictures
        anonymous: $anonymous
      }
    ) {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;
export type UpdateRetroMessageMutationFn = Apollo.MutationFunction<
  UpdateRetroMessageMutation,
  UpdateRetroMessageMutationVariables
>;

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
export function useUpdateRetroMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRetroMessageMutation,
    UpdateRetroMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRetroMessageMutation,
    UpdateRetroMessageMutationVariables
  >(UpdateRetroMessageDocument, options);
}
export type UpdateRetroMessageMutationHookResult = ReturnType<
  typeof useUpdateRetroMessageMutation
>;
export type UpdateRetroMessageMutationResult =
  Apollo.MutationResult<UpdateRetroMessageMutation>;
export type UpdateRetroMessageMutationOptions = Apollo.BaseMutationOptions<
  UpdateRetroMessageMutation,
  UpdateRetroMessageMutationVariables
>;
export const LikeRetroMessageDocument = gql`
  mutation LikeRetroMessage($_id: ID!, $count: Int) {
    retroMessage: likeRetroMessage(_id: $_id, count: $count) {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;
export type LikeRetroMessageMutationFn = Apollo.MutationFunction<
  LikeRetroMessageMutation,
  LikeRetroMessageMutationVariables
>;

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
export function useLikeRetroMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikeRetroMessageMutation,
    LikeRetroMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LikeRetroMessageMutation,
    LikeRetroMessageMutationVariables
  >(LikeRetroMessageDocument, options);
}
export type LikeRetroMessageMutationHookResult = ReturnType<
  typeof useLikeRetroMessageMutation
>;
export type LikeRetroMessageMutationResult =
  Apollo.MutationResult<LikeRetroMessageMutation>;
export type LikeRetroMessageMutationOptions = Apollo.BaseMutationOptions<
  LikeRetroMessageMutation,
  LikeRetroMessageMutationVariables
>;
export const DeleteRetroMessageDocument = gql`
  mutation DeleteRetroMessage($_id: ID!) {
    retroMessage: deleteRetroMessage(_id: $_id) {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;
export type DeleteRetroMessageMutationFn = Apollo.MutationFunction<
  DeleteRetroMessageMutation,
  DeleteRetroMessageMutationVariables
>;

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
export function useDeleteRetroMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRetroMessageMutation,
    DeleteRetroMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteRetroMessageMutation,
    DeleteRetroMessageMutationVariables
  >(DeleteRetroMessageDocument, options);
}
export type DeleteRetroMessageMutationHookResult = ReturnType<
  typeof useDeleteRetroMessageMutation
>;
export type DeleteRetroMessageMutationResult =
  Apollo.MutationResult<DeleteRetroMessageMutation>;
export type DeleteRetroMessageMutationOptions = Apollo.BaseMutationOptions<
  DeleteRetroMessageMutation,
  DeleteRetroMessageMutationVariables
>;
export const RetroMessageCreatedDocument = gql`
  subscription RetroMessageCreated {
    retroMessage: retroMessageCreated {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;

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
export function useRetroMessageCreatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    RetroMessageCreatedSubscription,
    RetroMessageCreatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    RetroMessageCreatedSubscription,
    RetroMessageCreatedSubscriptionVariables
  >(RetroMessageCreatedDocument, options);
}
export type RetroMessageCreatedSubscriptionHookResult = ReturnType<
  typeof useRetroMessageCreatedSubscription
>;
export type RetroMessageCreatedSubscriptionResult =
  Apollo.SubscriptionResult<RetroMessageCreatedSubscription>;
export const RetroMessageUpdatedDocument = gql`
  subscription RetroMessageUpdated {
    retroMessage: retroMessageUpdated {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;

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
export function useRetroMessageUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    RetroMessageUpdatedSubscription,
    RetroMessageUpdatedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    RetroMessageUpdatedSubscription,
    RetroMessageUpdatedSubscriptionVariables
  >(RetroMessageUpdatedDocument, options);
}
export type RetroMessageUpdatedSubscriptionHookResult = ReturnType<
  typeof useRetroMessageUpdatedSubscription
>;
export type RetroMessageUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<RetroMessageUpdatedSubscription>;
export const RetroMessageLikedDocument = gql`
  subscription RetroMessageLiked {
    retroMessage: retroMessageLiked {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;

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
export function useRetroMessageLikedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    RetroMessageLikedSubscription,
    RetroMessageLikedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    RetroMessageLikedSubscription,
    RetroMessageLikedSubscriptionVariables
  >(RetroMessageLikedDocument, options);
}
export type RetroMessageLikedSubscriptionHookResult = ReturnType<
  typeof useRetroMessageLikedSubscription
>;
export type RetroMessageLikedSubscriptionResult =
  Apollo.SubscriptionResult<RetroMessageLikedSubscription>;
export const RetroMessageDeletedDocument = gql`
  subscription RetroMessageDeleted {
    retroMessage: retroMessageDeleted {
      ...retroMessageFields
    }
  }
  ${RetroMessageFieldsFragmentDoc}
`;

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
export function useRetroMessageDeletedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    RetroMessageDeletedSubscription,
    RetroMessageDeletedSubscriptionVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<
    RetroMessageDeletedSubscription,
    RetroMessageDeletedSubscriptionVariables
  >(RetroMessageDeletedDocument, options);
}
export type RetroMessageDeletedSubscriptionHookResult = ReturnType<
  typeof useRetroMessageDeletedSubscription
>;
export type RetroMessageDeletedSubscriptionResult =
  Apollo.SubscriptionResult<RetroMessageDeletedSubscription>;
export const FindUsersDocument = gql`
  query FindUsers {
    findUsers {
      _id
      nickname
      username
      avatarUrl
    }
  }
`;

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
 *   },
 * });
 */
export function useFindUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindUsersQuery,
    FindUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUsersQuery, FindUsersQueryVariables>(
    FindUsersDocument,
    options,
  );
}
export function useFindUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUsersQuery,
    FindUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUsersQuery, FindUsersQueryVariables>(
    FindUsersDocument,
    options,
  );
}
export type FindUsersQueryHookResult = ReturnType<typeof useFindUsersQuery>;
export type FindUsersLazyQueryHookResult = ReturnType<
  typeof useFindUsersLazyQuery
>;
export type FindUsersQueryResult = Apollo.QueryResult<
  FindUsersQuery,
  FindUsersQueryVariables
>;
export const FindUserInfoDocument = gql`
  query FindUserInfo {
    findUserInfo {
      _id
      nickname
      username
      avatarUrl
    }
  }
`;

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
export function useFindUserInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FindUserInfoQuery,
    FindUserInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserInfoQuery, FindUserInfoQueryVariables>(
    FindUserInfoDocument,
    options,
  );
}
export function useFindUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindUserInfoQuery,
    FindUserInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserInfoQuery, FindUserInfoQueryVariables>(
    FindUserInfoDocument,
    options,
  );
}
export type FindUserInfoQueryHookResult = ReturnType<
  typeof useFindUserInfoQuery
>;
export type FindUserInfoLazyQueryHookResult = ReturnType<
  typeof useFindUserInfoLazyQuery
>;
export type FindUserInfoQueryResult = Apollo.QueryResult<
  FindUserInfoQuery,
  FindUserInfoQueryVariables
>;
export const LoginDocument = gql`
  query Login($input: LoginUserInput) {
    login(input: $input) {
      user {
        _id
        nickname
        username
        avatarUrl
      }
      token
    }
  }
`;

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
export function useLoginQuery(
  baseOptions?: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options,
  );
}
export function useLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(
    LoginDocument,
    options,
  );
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<
  LoginQuery,
  LoginQueryVariables
>;

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[];
  };
}
const result: PossibleTypesResultData = {
  possibleTypes: {
    CommentObjectUnion: ['Comment', 'News', 'RetroMessage'],
    Document: [
      'Comment',
      'Dynamic',
      'Follow',
      'Interest',
      'Like',
      'Retro',
      'RetroListItem',
      'RetroMessage',
    ],
    LikeObjectUnion: ['Comment', 'Dynamic', 'News', 'RetroMessage'],
  },
};
export default result;
