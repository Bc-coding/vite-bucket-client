import { gql } from "@apollo/client";

const CREATE_BUCKET_LIST_BY_USER = gql`
  mutation CreateBucketList($input: BucketListCreateInput) {
    createBucketList(input: $input) {
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
        emoji
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

export { CREATE_BUCKET_LIST_BY_USER };
