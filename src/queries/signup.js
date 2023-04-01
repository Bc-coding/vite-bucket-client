import { gql } from "@apollo/client";

const SIGNUP = gql`
  mutation Signup($input: signupInput) {
    signup(input: $input) {
      id
      userId
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export { SIGNUP };
