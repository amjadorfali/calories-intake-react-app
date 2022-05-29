import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type CreateFoodInput = {
  calorieValue: Scalars['Float'];
  dateTaken: Scalars['DateTime'];
  name: Scalars['String'];
  price?: InputMaybe<Scalars['Float']>;
};

export type CreateUserInput = {
  /** Calorie Daily Limit */
  dailyLimit?: InputMaybe<Scalars['Float']>;
  /** Pass */
  password: Scalars['String'];
  /** Role */
  role: Scalars['String'];
  /** User Name */
  userName: Scalars['String'];
};

export type Food = {
  __typename?: 'Food';
  calorieValue: Scalars['Float'];
  dateTaken: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Float']>;
};

export type LoginInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFood: Food;
  adminCreateFood: Food;
  removeFood?: Maybe<Scalars['String']>;
  signIn: LoginResponse;
  signUp: LoginResponse;
  updateDailyLimit: UserEntity;
  updateFood: Food;
};


export type MutationAddFoodArgs = {
  createFoodInput: CreateFoodInput;
};


export type MutationAdminCreateFoodArgs = {
  createFoodInput: CreateFoodInput;
  userId: Scalars['String'];
};


export type MutationRemoveFoodArgs = {
  id: Scalars['String'];
};


export type MutationSignInArgs = {
  user: LoginInput;
};


export type MutationSignUpArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdateDailyLimitArgs = {
  dailyLimit: Scalars['Float'];
};


export type MutationUpdateFoodArgs = {
  updateFoodInput: UpdateFoodInput;
};

export type Query = {
  __typename?: 'Query';
  fetchFoods: Array<Food>;
  getCurrentAuthenticatedUser: UserEntity;
  getUsers: Array<UserEntity>;
};

export type UpdateFoodInput = {
  calorieValue?: InputMaybe<Scalars['Float']>;
  dateTaken?: InputMaybe<Scalars['DateTime']>;
  foodId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  dailyLimit?: Maybe<Scalars['Float']>;
  foods: Array<Food>;
  id: Scalars['String'];
  password: Scalars['String'];
  registrationNumber: Scalars['Float'];
  role: Scalars['String'];
  userName: Scalars['String'];
};

export type AddFoodMutationVariables = Exact<{
  createFoodInput: CreateFoodInput;
}>;


export type AddFoodMutation = { __typename?: 'Mutation', addFood: { __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null } };

export type AdminCreateFoodMutationVariables = Exact<{
  createFoodInput: CreateFoodInput;
  userId: Scalars['String'];
}>;


export type AdminCreateFoodMutation = { __typename?: 'Mutation', adminCreateFood: { __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null } };

export type RemoveFoodMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveFoodMutation = { __typename?: 'Mutation', removeFood?: string | null };

export type SignInMutationVariables = Exact<{
  user: LoginInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'LoginResponse', accessToken: string } };

export type SignUpMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'LoginResponse', accessToken: string } };

export type UpdateDailyLimitMutationVariables = Exact<{
  dailyLimit: Scalars['Float'];
}>;


export type UpdateDailyLimitMutation = { __typename?: 'Mutation', updateDailyLimit: { __typename?: 'UserEntity', dailyLimit?: number | null, id: string, password: string, registrationNumber: number, role: string, userName: string, foods: Array<{ __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null }> } };

export type UpdateFoodMutationVariables = Exact<{
  updateFoodInput: UpdateFoodInput;
}>;


export type UpdateFoodMutation = { __typename?: 'Mutation', updateFood: { __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null } };

export type FetchFoodsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchFoodsQuery = { __typename?: 'Query', fetchFoods: Array<{ __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null }> };

export type GetCurrentAuthenticatedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentAuthenticatedUserQuery = { __typename?: 'Query', getCurrentAuthenticatedUser: { __typename?: 'UserEntity', dailyLimit?: number | null, id: string, password: string, registrationNumber: number, role: string, userName: string, foods: Array<{ __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null }> } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'UserEntity', dailyLimit?: number | null, id: string, password: string, registrationNumber: number, role: string, userName: string, foods: Array<{ __typename?: 'Food', calorieValue: number, dateTaken: any, id: string, name: string, price?: number | null }> }> };


export const AddFoodDocument = `
    mutation addFood($createFoodInput: CreateFoodInput!) {
  addFood(createFoodInput: $createFoodInput) {
    calorieValue
    dateTaken
    id
    name
    price
  }
}
    `;
export const useAddFoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AddFoodMutation, TError, AddFoodMutationVariables, TContext>
    ) =>
    useMutation<AddFoodMutation, TError, AddFoodMutationVariables, TContext>(
      ['addFood'],
      (variables?: AddFoodMutationVariables) => fetcher<AddFoodMutation, AddFoodMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AddFoodDocument, variables)(),
      options
    );
export const AdminCreateFoodDocument = `
    mutation adminCreateFood($createFoodInput: CreateFoodInput!, $userId: String!) {
  adminCreateFood(createFoodInput: $createFoodInput, userId: $userId) {
    calorieValue
    dateTaken
    id
    name
    price
  }
}
    `;
export const useAdminCreateFoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<AdminCreateFoodMutation, TError, AdminCreateFoodMutationVariables, TContext>
    ) =>
    useMutation<AdminCreateFoodMutation, TError, AdminCreateFoodMutationVariables, TContext>(
      ['adminCreateFood'],
      (variables?: AdminCreateFoodMutationVariables) => fetcher<AdminCreateFoodMutation, AdminCreateFoodMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, AdminCreateFoodDocument, variables)(),
      options
    );
export const RemoveFoodDocument = `
    mutation removeFood($id: String!) {
  removeFood(id: $id)
}
    `;
export const useRemoveFoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<RemoveFoodMutation, TError, RemoveFoodMutationVariables, TContext>
    ) =>
    useMutation<RemoveFoodMutation, TError, RemoveFoodMutationVariables, TContext>(
      ['removeFood'],
      (variables?: RemoveFoodMutationVariables) => fetcher<RemoveFoodMutation, RemoveFoodMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, RemoveFoodDocument, variables)(),
      options
    );
export const SignInDocument = `
    mutation signIn($user: LoginInput!) {
  signIn(user: $user) {
    accessToken
  }
}
    `;
export const useSignInMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<SignInMutation, TError, SignInMutationVariables, TContext>
    ) =>
    useMutation<SignInMutation, TError, SignInMutationVariables, TContext>(
      ['signIn'],
      (variables?: SignInMutationVariables) => fetcher<SignInMutation, SignInMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SignInDocument, variables)(),
      options
    );
export const SignUpDocument = `
    mutation signUp($createUserInput: CreateUserInput!) {
  signUp(createUserInput: $createUserInput) {
    accessToken
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      ['signUp'],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, SignUpDocument, variables)(),
      options
    );
export const UpdateDailyLimitDocument = `
    mutation updateDailyLimit($dailyLimit: Float!) {
  updateDailyLimit(dailyLimit: $dailyLimit) {
    dailyLimit
    foods {
      calorieValue
      dateTaken
      id
      name
      price
    }
    id
    password
    registrationNumber
    role
    userName
  }
}
    `;
export const useUpdateDailyLimitMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateDailyLimitMutation, TError, UpdateDailyLimitMutationVariables, TContext>
    ) =>
    useMutation<UpdateDailyLimitMutation, TError, UpdateDailyLimitMutationVariables, TContext>(
      ['updateDailyLimit'],
      (variables?: UpdateDailyLimitMutationVariables) => fetcher<UpdateDailyLimitMutation, UpdateDailyLimitMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateDailyLimitDocument, variables)(),
      options
    );
export const UpdateFoodDocument = `
    mutation updateFood($updateFoodInput: UpdateFoodInput!) {
  updateFood(updateFoodInput: $updateFoodInput) {
    calorieValue
    dateTaken
    id
    name
    price
  }
}
    `;
export const useUpdateFoodMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      options?: UseMutationOptions<UpdateFoodMutation, TError, UpdateFoodMutationVariables, TContext>
    ) =>
    useMutation<UpdateFoodMutation, TError, UpdateFoodMutationVariables, TContext>(
      ['updateFood'],
      (variables?: UpdateFoodMutationVariables) => fetcher<UpdateFoodMutation, UpdateFoodMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, UpdateFoodDocument, variables)(),
      options
    );
export const FetchFoodsDocument = `
    query fetchFoods {
  fetchFoods {
    calorieValue
    dateTaken
    id
    name
    price
  }
}
    `;
export const useFetchFoodsQuery = <
      TData = FetchFoodsQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: FetchFoodsQueryVariables,
      options?: UseQueryOptions<FetchFoodsQuery, TError, TData>
    ) =>
    useQuery<FetchFoodsQuery, TError, TData>(
      variables === undefined ? ['fetchFoods'] : ['fetchFoods', variables],
      fetcher<FetchFoodsQuery, FetchFoodsQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, FetchFoodsDocument, variables),
      options
    );
export const GetCurrentAuthenticatedUserDocument = `
    query getCurrentAuthenticatedUser {
  getCurrentAuthenticatedUser {
    dailyLimit
    foods {
      calorieValue
      dateTaken
      id
      name
      price
    }
    id
    password
    registrationNumber
    role
    userName
  }
}
    `;
export const useGetCurrentAuthenticatedUserQuery = <
      TData = GetCurrentAuthenticatedUserQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetCurrentAuthenticatedUserQueryVariables,
      options?: UseQueryOptions<GetCurrentAuthenticatedUserQuery, TError, TData>
    ) =>
    useQuery<GetCurrentAuthenticatedUserQuery, TError, TData>(
      variables === undefined ? ['getCurrentAuthenticatedUser'] : ['getCurrentAuthenticatedUser', variables],
      fetcher<GetCurrentAuthenticatedUserQuery, GetCurrentAuthenticatedUserQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCurrentAuthenticatedUserDocument, variables),
      options
    );
export const GetUsersDocument = `
    query getUsers {
  getUsers {
    dailyLimit
    foods {
      calorieValue
      dateTaken
      id
      name
      price
    }
    id
    password
    registrationNumber
    role
    userName
  }
}
    `;
export const useGetUsersQuery = <
      TData = GetUsersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: GetUsersQueryVariables,
      options?: UseQueryOptions<GetUsersQuery, TError, TData>
    ) =>
    useQuery<GetUsersQuery, TError, TData>(
      variables === undefined ? ['getUsers'] : ['getUsers', variables],
      fetcher<GetUsersQuery, GetUsersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetUsersDocument, variables),
      options
    );