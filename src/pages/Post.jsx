import React from "react";
import Layout from "../components/Layout";

import { useQuery } from "@apollo/client";
import { GET_POST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";
import PostItem from "../components/PostItem";
import { useParams } from "react-router-dom";

const Post = () => {
  let { postId } = useParams();

  const {
    loading: getPostLoading,
    error: getPostError,
    data: getPostData,
    refetch,
  } = useQuery(GET_POST_BY_USER, {
    variables: {
      input: {
        postId: postId,
      },
    },
  });

  return (
    <Layout>
      <QueryResult
        error={getPostError}
        loading={getPostLoading}
        data={getPostData}
      >
        {getPostData && <PostItem post={getPostData} />}
      </QueryResult>
    </Layout>
  );
};

export default Post;
