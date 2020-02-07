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
