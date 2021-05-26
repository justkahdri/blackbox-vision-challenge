import React, {useState, useContext, useEffect} from "react";
import {Heading, Stack, useRadioGroup, Button, useToast, Box} from "@chakra-ui/react";
import {Redirect, useParams} from "react-router";
import he from "he";

import AppContext from "../../context";

import RadioCard from "./RadioCard";

const QuestionBox = () => {
  const initialState = {
    question: "",
    category: "",
    difficulty: "",
    type: "",
    correct_answer: "",
    all_answers: [""],
  };

  const toast = useToast();
  const [answerRadio, setAnswerRadio] = useState("");
  const [redirect, setRedirect] = useState("");
  const {questions, addPoints} = useContext(AppContext);
  const {questionId} = useParams<{questionId: string}>();

  const [state, setState] = useState(initialState);

  const {getRootProps, getRadioProps} = useRadioGroup({
    name: "answers",
    onChange: setAnswerRadio,
  });

  const group = getRootProps();

  const handleSubmit = () => {
    if (answerRadio === state.correct_answer) {
      toast({
        title: "Correct!",
        description: "Good one!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      addPoints(state.type == "boolean" ? 5 : 10);
    } else {
      toast({
        title: "Incorrect",
        description: "That's a shame",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    setRedirect(`/quiz/${parseInt(questionId) + 1}`);
  };

  useEffect(() => {
    try {
      const {correct_answer, incorrect_answers, ...rest} = questions[parseInt(questionId)];

      setState((state) => ({
        ...state,
        ...rest,
        correct_answer,
        all_answers: [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5),
      }));
    } catch (err) {
      if (questionId === "10") {
        setRedirect("/end");
      } else {
        setRedirect("/");
      }
      // console.error(err);
    }

    return () => {
      setAnswerRadio("");
      setRedirect("");
    };
  }, [questionId, questions]);

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <Stack
        bgColor="white"
        color="blackAlpha.800"
        p={5}
        rounded="md"
        shadow="lg"
        spacing={6}
        w="60%"
      >
        <Heading as="h1">Question #{parseInt(questionId) + 1}</Heading>
        <Stack direction="row">
          {Array(10)
            .fill("")
            .map((_, i) => (
              <Box
                key={i}
                bgColor={i > parseInt(questionId) ? "teal.100" : "primary.500"}
                flex={1}
                height={2}
              />
            ))}
        </Stack>
        <Heading as="h2" size="md">
          {he.decode(state.question)}
        </Heading>

        <Stack direction={state.type == "boolean" ? "row" : "column"}>
          {state.all_answers.map((answer) => {
            const radio = getRadioProps({value: answer});

            return (
              <RadioCard key={answer} {...radio}>
                {he.decode(answer)}
              </RadioCard>
            );
          })}
        </Stack>
        <Button isDisabled={!answerRadio} onClick={handleSubmit}>
          Next
        </Button>
      </Stack>
    );
  }
};

export default QuestionBox;
