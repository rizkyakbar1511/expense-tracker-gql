import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CategoryStatistics = {
  __typename?: "CategoryStatistics";
  category: Scalars["String"]["output"];
  totalAmount: Scalars["Float"]["output"];
};

export type CreateTransactionInput = {
  amount: Scalars["Float"]["input"];
  category: Scalars["String"]["input"];
  date: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  location?: InputMaybe<Scalars["String"]["input"]>;
  paymentType: Scalars["String"]["input"];
};

export type LoginInput = {
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type LogoutResponse = {
  __typename?: "LogoutResponse";
  message: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  createTransaction: Transaction;
  deleteTransaction: Transaction;
  login?: Maybe<User>;
  logout?: Maybe<LogoutResponse>;
  signUp?: Maybe<User>;
  updateTransaction: Transaction;
};

export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};

export type MutationDeleteTransactionArgs = {
  transactionId: Scalars["ID"]["input"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateTransactionArgs = {
  input: UpdateTransactionInput;
};

export type Query = {
  __typename?: "Query";
  authUser?: Maybe<User>;
  categoryStatistics?: Maybe<Array<CategoryStatistics>>;
  transaction?: Maybe<Transaction>;
  transactions?: Maybe<Array<Transaction>>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};

export type QueryTransactionArgs = {
  transactionId: Scalars["ID"]["input"];
};

export type QueryUserArgs = {
  userId: Scalars["ID"]["input"];
};

export type SignUpInput = {
  gender: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type Transaction = {
  __typename?: "Transaction";
  _id: Scalars["String"]["output"];
  amount: Scalars["Float"]["output"];
  category: Scalars["String"]["output"];
  date: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  location?: Maybe<Scalars["String"]["output"]>;
  paymentType: Scalars["String"]["output"];
  userId: Scalars["String"]["output"];
};

export type UpdateTransactionInput = {
  amount?: InputMaybe<Scalars["Float"]["input"]>;
  category?: InputMaybe<Scalars["String"]["input"]>;
  date?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  paymentType?: InputMaybe<Scalars["String"]["input"]>;
  transactionId: Scalars["ID"]["input"];
};

export type User = {
  __typename?: "User";
  _id: Scalars["ID"]["output"];
  gender: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  password: Scalars["String"]["output"];
  profilePicture?: Maybe<Scalars["String"]["output"]>;
  transactions?: Maybe<Array<Transaction>>;
  username: Scalars["String"]["output"];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CategoryStatistics: ResolverTypeWrapper<CategoryStatistics>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Float: ResolverTypeWrapper<Scalars["Float"]["output"]>;
  CreateTransactionInput: CreateTransactionInput;
  LoginInput: LoginInput;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  Query: ResolverTypeWrapper<{}>;
  SignUpInput: SignUpInput;
  Transaction: ResolverTypeWrapper<TransactionDbObject>;
  UpdateTransactionInput: UpdateTransactionInput;
  User: ResolverTypeWrapper<UserDbObject>;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  CategoryStatistics: CategoryStatistics;
  String: Scalars["String"]["output"];
  Float: Scalars["Float"]["output"];
  CreateTransactionInput: CreateTransactionInput;
  LoginInput: LoginInput;
  LogoutResponse: LogoutResponse;
  Mutation: {};
  ID: Scalars["ID"]["output"];
  Query: {};
  SignUpInput: SignUpInput;
  Transaction: TransactionDbObject;
  UpdateTransactionInput: UpdateTransactionInput;
  User: UserDbObject;
  AdditionalEntityFields: AdditionalEntityFields;
  Boolean: Scalars["Boolean"]["output"];
}>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars["String"]["input"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = UnionDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars["String"]["input"];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = AbstractEntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars["Boolean"]["input"]>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EntityDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars["String"]["input"]>;
};

export type ColumnDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = ColumnDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {};

export type IdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = IdDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars["String"]["input"]>;
};

export type LinkDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = LinkDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {};

export type EmbeddedDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = EmbeddedDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars["String"]["input"];
};

export type MapDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = MapDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CategoryStatisticsResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CategoryStatistics"] = ResolversParentTypes["CategoryStatistics"]
> = ResolversObject<{
  category?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  totalAmount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LogoutResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["LogoutResponse"] = ResolversParentTypes["LogoutResponse"]
> = ResolversObject<{
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = ResolversObject<{
  createTransaction?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTransactionArgs, "input">
  >;
  deleteTransaction?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTransactionArgs, "transactionId">
  >;
  login?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, "input">
  >;
  logout?: Resolver<Maybe<ResolversTypes["LogoutResponse"]>, ParentType, ContextType>;
  signUp?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<MutationSignUpArgs, "input">
  >;
  updateTransaction?: Resolver<
    ResolversTypes["Transaction"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateTransactionArgs, "input">
  >;
}>;

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = ResolversObject<{
  authUser?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  categoryStatistics?: Resolver<
    Maybe<Array<ResolversTypes["CategoryStatistics"]>>,
    ParentType,
    ContextType
  >;
  transaction?: Resolver<
    Maybe<ResolversTypes["Transaction"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTransactionArgs, "transactionId">
  >;
  transactions?: Resolver<Maybe<Array<ResolversTypes["Transaction"]>>, ParentType, ContextType>;
  user?: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "userId">
  >;
  users?: Resolver<Maybe<Array<ResolversTypes["User"]>>, ParentType, ContextType>;
}>;

export type TransactionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Transaction"] = ResolversParentTypes["Transaction"]
> = ResolversObject<{
  _id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes["Float"], ParentType, ContextType>;
  category?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  date?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  paymentType?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = ResolversObject<{
  _id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  gender?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  password?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  profilePicture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  transactions?: Resolver<Maybe<Array<ResolversTypes["Transaction"]>>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CategoryStatistics?: CategoryStatisticsResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
}>;

export type TransactionDbObject = {
  _id: unknown;
  amount: number;
  category: string;
  date: Date;
  description: string;
  location?: Maybe<string>;
  paymentType: string;
  userId: unknown;
};

export type UserDbObject = {
  _id: unknown;
  gender: string;
  name: string;
  password: string;
  profilePicture?: Maybe<string>;
  transactions?: Maybe<Array<TransactionDbObject["_id"]>>;
  username: string;
};
