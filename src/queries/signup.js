import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($input: signupInput) {
    signup(input: $input) {
      userErrors {
        message
      }
      user {
        id
        userId
        name
        email
        createdAt
        updatedAt
      }
    }
  }
`;

export { SIGNUP };
