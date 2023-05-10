import { useQuery, useLazyQuery } from "@apollo/client";
import { QueryResult } from "./index";
import { IDEAS, IDEA_BY_TYPE } from "../queries/index";

const fetchAnIdea = () => {
  const { loading, error, data, refetch } = useQuery(IDEAS);

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <span>Random idea: </span>
      <span>💡</span>
      <span> {data && data?.activity?.activity}</span>
    </QueryResult>
  );
};

export default fetchAnIdea;
