import { gql } from "apollo-boost";
import { BOOK_FRAGMENT, USER_FRAGMENT } from "./fragments";

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
