import { gql } from "@apollo/client";

const READ_ALL_BUCKET_LIST_BY_USER = gql`
  query ReadAllBucketList {
    readAllBucketList {
      userErrors {
        message
      }
      posts {
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
        userId
      }
    }
  }
`;

export { READ_ALL_BUCKET_LIST_BY_USER };
