import { gql } from "apollo-boost";

export const BOOK_FRAGMENT = gql`
  fragment BookParts on Book {
    isbn
    title
    link
    image
    author
    price
    discount
    publisher
    description
  }
`;

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    sentiment
    book {
      ...BookParts
    }
    comments {
      id
      text
      user {
        id
        name
      }
    }
    isLiked
    likeCount
    commentCount
  }
  ${BOOK_FRAGMENT}
`;

export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    name
    email
    posts {
      ...PostParts
    }
    isFollowing
    isSelf
    followersCount
    followingCount
    postsCount
  }
  ${POST_FRAGMENT}
`;
