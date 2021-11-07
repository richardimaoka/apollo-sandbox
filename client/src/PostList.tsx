// PostList.jsx
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { PostHeader } from "./PostHeader";

const POST_LIST_QUERY = gql`
  query PostList {
    posts {
      ...PostHeader
    }
  }
  ${PostHeader.fragments.post}
`;

export const PostList = () => {
  const { loading, error, data } = useQuery(POST_LIST_QUERY);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error || !data) {
    return <div>An error occurred</div>;
  }
  return (
    <div>
      <div>
        {data.posts.map((post) => (
          <PostHeader post={post} />
        ))}
      </div>
    </div>
  );
};
