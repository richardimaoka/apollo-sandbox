// Avatar.jsx
import gql from "graphql-tag";
import { AvatarFragment } from "./generated/graphql";

export interface AvatarProps {
  user: AvatarFragment;
}

export const Avatar = ({ user }) => {
  return (
    <div>
      <a href={`/user/${user.id}`}>
        <h3>{user.name}</h3>
        <img src={user.image} />
      </a>
    </div>
  );
};

Avatar.fragments = {
  user: gql`
    fragment Avatar on User {
      id
      name
      image
    }
  `,
};
