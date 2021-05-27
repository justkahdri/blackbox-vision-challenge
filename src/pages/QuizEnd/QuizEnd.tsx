import React, {useContext} from "react";
import {Button, Heading, Stack, Text, Icon} from "@chakra-ui/react";
import {AiFillTrophy} from "react-icons/ai";
import {Link} from "react-router-dom";

import AppContext from "../../context";

const QuizEnd = () => {
  const {points} = useContext(AppContext);

  return (
    <Stack alignItems="center" spacing={6}>
      <Heading>Game Over</Heading>
      <Stack alignItems="center" direction="row" spacing={3} textAlign="center">
        <Icon as={AiFillTrophy} boxSize={6} />
        <Text fontSize="2xl">Points: {points}</Text>
        <Icon as={AiFillTrophy} boxSize={6} />
      </Stack>

      <Stack>
        <Button as={Link} colorScheme="primary" size="lg" to="/quiz">
          Play Again
        </Button>
        <Button as={Link} colorScheme="red" to="/">
          Back to menu
        </Button>
      </Stack>
    </Stack>
  );
};

export default QuizEnd;
