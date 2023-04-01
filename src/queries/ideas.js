import { gql } from "@apollo/client";

const IDEAS = gql`
  query Activity {
    activity {
      activity
      accessibility
      type
      participants
      price
      link
      key
    }
  }
`;

const IDEA_BY_TYPE = gql`
  query ActivityByType($input: typeInput) {
    activityByType(input: $input) {
      activity
      accessibility
      type
      participants
      price
      link
      key
    }
  }
`;
export { IDEAS, IDEA_BY_TYPE };
