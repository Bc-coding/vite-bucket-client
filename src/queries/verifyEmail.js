import { gql } from "@apollo/client";

const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: confirmationCodeInput) {
    verifyEmail(input: $input) {
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
        status
      }
    }
  }
`;

export { VERIFY_EMAIL };
