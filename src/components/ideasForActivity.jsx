import React from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QueryResult } from "./index";
import { VStack, Box, Button } from "@chakra-ui/react";
import { IDEAS, IDEA_BY_TYPE } from "../queries/index";

const buttons = [
  { title: "📚 Education", arg: "education" },
  { title: "⛱️ Recreational", arg: "recreational" },
  { title: "🤝 Social", arg: "social" },
  { title: "🔨 DIY", arg: "diy" },
  { title: "💙 Charity", arg: "charity" },
  { title: "🍳 Cooking", arg: "cooking" },
  { title: "🛋️ Relaxation", arg: "relaxation" },
  { title: "🎵 Music", arg: "music" },
  { title: "🖨️ Busywork", arg: "busywork" },
];

const IdeasForActivity = () => {
  const { loading, error, data, refetch } = useQuery(IDEAS);

  const [
    getActivityByType,
    {
      loading: activityByTypeLoading,
      error: activityByTypeError,
      data: activityByTypeData,
    },
  ] = useLazyQuery(IDEA_BY_TYPE, {
    fetchPolicy: "network-only",
  });

  return (
    <VStack spacing="24px">
      <Box>
        <QueryResult error={error} loading={loading} data={data}>
          <span>💡</span>
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {data && data?.activity?.activity}
          </span>
        </QueryResult>
      </Box>
      <Button onClick={() => refetch()}>Refetch a new idea!</Button>

      <Box>
        {buttons.map((button, i) => {
          return (
            <Button
              key={i}
              colorScheme="teal"
              marginRight="20px"
              marginBottom="20px"
              size="sm"
              onClick={() => {
                getActivityByType({
                  variables: {
                    input: {
                      type: button.arg,
                    },
                  },
                });
              }}
            >
              {button.title}
            </Button>
          );
        })}
      </Box>
      <Box>
        <QueryResult
          error={activityByTypeError}
          loading={activityByTypeLoading}
          data={activityByTypeData}
        >
          <p style={{ fontWeight: "bold" }}>
            {activityByTypeData?.activityByType.activity}
          </p>
        </QueryResult>
      </Box>
    </VStack>
  );
};

export default IdeasForActivity;
