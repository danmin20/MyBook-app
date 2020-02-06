import { gql } from "apollo-boost";

export const SEARCH = gql`
  query books($term: String!) {
    books(term: $term) {
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
  }
`;
