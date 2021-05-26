import {Button, Heading, Stack, Text} from "@chakra-ui/react";
import React, {useContext} from "react";

import AppContext from "../../context";

const QuizEnd = () => {
  const {points} = useContext(AppContext);

  return (
    <Stack>
      <Heading>Game Over</Heading>
      <Text>Points: {points}</Text>
      <Stack direction="row">
        <Button>Play Again</Button>
        <Button>Go to menu</Button>
      </Stack>
    </Stack>
  );
};

export default QuizEnd;
