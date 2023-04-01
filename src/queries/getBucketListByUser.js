import { gql } from "@apollo/client";

const GET_POST_BY_USER = gql`
  query GetPostBucketList($input: PostIdInput) {
    getPostBucketList(input: $input) {
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

export { GET_POST_BY_USER };
