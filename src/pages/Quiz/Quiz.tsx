import {Heading, Stack, Progress, Button} from "@chakra-ui/react";
import React, {useEffect, useContext} from "react";
import {Link} from "react-router-dom";

import AppContext from "../../context";

const Quiz = () => {
  const {questions, setQuestions} = useContext(AppContext);

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      setQuestions([]);
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const formatted = await response.json();

      isActive && setQuestions(formatted.results);
    };

    fetchData();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <Stack>
      <Heading>All ready?</Heading>
      <Button as={Link} colorScheme="blue" isLoading={!questions.length} to="/quiz/1">
        I&apos;m Ready
      </Button>
      {/* <Progress isIndeterminate size="xs" /> */}
    </Stack>
  );
};

export default Quiz;
