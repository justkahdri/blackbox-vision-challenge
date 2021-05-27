import React, {FC, Fragment} from "react";
import {Heading, Stack, Box} from "@chakra-ui/react";

const QuestionProgress: FC<{current: number; max?: number}> = ({current, max = 10}) => (
  <Fragment>
    <Heading as="h1">Question #{current + 1}</Heading>
    <Stack direction="row">
      {Array(max)
        .fill("")
        .map((_, i) => (
          <Box key={i} bgColor={i > current ? "teal.100" : "primary.500"} flex={1} height={2} />
        ))}
    </Stack>
  </Fragment>
);

export default QuestionProgress;
