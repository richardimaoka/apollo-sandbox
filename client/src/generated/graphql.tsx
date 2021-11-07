import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: "Comment";
  author: User;
  content: Scalars["String"];
  date: Scalars["String"];
  id: Scalars["ID"];
};

export type Post = {
  __typename?: "Post";
  author: User;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content: Scalars["String"];
  date: Scalars["String"];
  id: Scalars["ID"];
  title: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  post?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type QueryPostArgs = {
  id: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  twitter?: Maybe<Scalars["String"]>;
};

export type AvatarFragment = {
  __typename?: "User";
  id: string;
  name: string;
  image?: string | null | undefined;
};

export type PostHeaderFragment = {
  __typename?: "Post";
  id: string;
  title: string;
  author: {
    __typename?: "User";
    id: string;
    name: string;
    image?: string | null | undefined;
  };
};

export type PostListQueryVariables = Exact<{ [key: string]: never }>;

export type PostListQuery = {
  __typename?: "Query";
  posts?:
    | Array<
        | {
            __typename?: "Post";
            id: string;
            title: string;
            author: {
              __typename?: "User";
              id: string;
              name: string;
              image?: string | null | undefined;
            };
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export const AvatarFragmentDoc = gql`
  fragment Avatar on User {
    id
    name
    image
  }
`;
export const PostHeaderFragmentDoc = gql`
  fragment PostHeader on Post {
    id
    title
    author {
      ...Avatar
    }
  }
  ${AvatarFragmentDoc}
`;
export const PostListDocument = gql`
  query PostList {
    posts {
      ...PostHeader
    }
  }
  ${PostHeaderFragmentDoc}
`;

/**
 * __usePostListQuery__
 *
 * To run a query within a React component, call `usePostListQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostListQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostListQuery(
  baseOptions?: Apollo.QueryHookOptions<PostListQuery, PostListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostListQuery, PostListQueryVariables>(
    PostListDocument,
    options
  );
}
export function usePostListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PostListQuery,
    PostListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostListQuery, PostListQueryVariables>(
    PostListDocument,
    options
  );
}
export type PostListQueryHookResult = ReturnType<typeof usePostListQuery>;
export type PostListLazyQueryHookResult = ReturnType<
  typeof usePostListLazyQuery
>;
export type PostListQueryResult = Apollo.QueryResult<
  PostListQuery,
  PostListQueryVariables
>;
