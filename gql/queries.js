import { gql } from "apollo-boost";
import { BOOK_FRAGMENT, USER_FRAGMENT, POST_FRAGMENT } from "./fragments";

export const SEARCH = gql`
  query books($term: String!) {
    books(term: $term) {
      ...BookParts
    }
  }
  ${BOOK_FRAGMENT}
`;

export const ME = gql`
  {
    me {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const POST_DETAIL = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const USER_DETAIL = gql`
  query seeUser($userId: String!) {
    seeUser(userId: $userId) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

export const FEED = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const SEARCH_USER = gql`
  query searchUser($name: String!) {
    searchUser(name: $name) {
      id
      name
      bio
      isFollowing
      isSelf
      postsCount
    }
  }
`;

export const TOGGLE_FOLLOW = gql`
  mutation toggleFollow($id: String!) {
    toggleFollow(id: $id)
  }
`;

export const UPLOAD = gql`
  mutation upload($bookId: String!, $title: String!, $sentiment: String!) {
    upload(bookId: $bookId, title: $title, sentiment: $sentiment) {
      id
    }
  }
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $title: String
    $sentiment: String
    $action: ACTION!
  ) {
    editPost(id: $id, title: $title, sentiment: $sentiment, action: $action) {
      id
    }
  }
`;

export const DEL_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
    }
  }
`;

export const POST_DB = gql`
  {
    seePostDB {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const EDIT_USER = gql`
  mutation editUser($name: String, $bio: String) {
    editUser(name: $name, bio: $bio) {
      id
    }
  }
`;
