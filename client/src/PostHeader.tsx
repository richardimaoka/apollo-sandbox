// PostHeader.jsx
import gql from "graphql-tag";
import { Avatar } from "./Avatar";
export const PostHeader = ({ post }) => {
  return (
    <div>
      <Avatar user={post.author} />
      {/* <Link to={`/post/${post.id}`}> */}
      <h1>{post.title}</h1>
      {/* </Link> */}
    </div>
  );
};

PostHeader.fragments = {
  post: gql`
    fragment PostHeader on Post {
      id
      title
      author {
        ...Avatar
      }
    }
    ${Avatar.fragments.user}
  `,
};
