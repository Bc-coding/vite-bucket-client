import { gql } from "@apollo/client";

const DELETE_POST_BY_USER = gql`
  mutation DeleteBucketList($input: PostIdInput) {
    deleteBucketList(input: $input) {
      userErrors {
        message
      }
      post {
        id
        postId
        title
        category
        desc
        location
        completed
        date
        memo
        createdAt
        updatedAt
        _user {
          id
          userId
          name
          email
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export { DELETE_POST_BY_USER };
