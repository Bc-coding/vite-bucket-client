import { gql } from "@apollo/client";

const UPDATE_BUCKET_LIST_BY_USER = gql`
  mutation UpdateBucketList($input: BucketListUpdateInput) {
    updateBucketList(input: $input) {
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

export { UPDATE_BUCKET_LIST_BY_USER };
