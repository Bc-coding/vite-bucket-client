import { useQuery, useLazyQuery } from "@apollo/client";
import { QueryResult } from "./index";
import { IDEAS, IDEA_BY_TYPE } from "../queries/index";
import { Text } from "@chakra-ui/react";

const fetchAnIdea = () => {
  const { loading, error, data, refetch } = useQuery(IDEAS);

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <Text fontSize='20px' color='white'>
        <span>Random idea: </span>
        <span>💡</span>
        <span> {data && data?.activity?.activity}</span>
      </Text>
    </QueryResult>
  );
};

export default fetchAnIdea;
