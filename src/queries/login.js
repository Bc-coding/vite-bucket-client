import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation ($input: loginInput) {
    login(input: $input) {
      token
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

export { LOGIN_USER };
