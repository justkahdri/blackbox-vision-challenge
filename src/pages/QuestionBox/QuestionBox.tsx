import React, {useState, useContext, useEffect} from "react";
import {Heading, Stack, useRadioGroup, Button, useToast, Box} from "@chakra-ui/react";
import {Redirect, useParams} from "react-router";
import he from "he";
import {Question} from "Types";

import AppContext from "../../context";

import Details from "./Details";
import RadioCard from "./RadioCard";
import QuestionProgress from "./QuestionProgress";

const QuestionBox = () => {
  interface StateProps extends Question {
    all_answers: string[];
  }
  const initialState: StateProps = {
    all_answers: [],
    question: "",
    correct_answer: "",
    incorrect_answers: [],
    category: "",
    type: "boolean",
    difficulty: "easy",
  };

  const toast = useToast();
  const [answerRadio, setAnswerRadio] = useState("");
  const [redirect, setRedirect] = useState("");
  const {questions, addPoints} = useContext(AppContext);
  const {questionId} = useParams<{questionId: string}>();

  const [state, setState] = useState(initialState);

  const {getRadioProps} = useRadioGroup({
    name: "answers",
    onChange: setAnswerRadio,
  });

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
      <Stack spacing={8} w={{sm: "80%", md: "60%", xl: "50%"}}>
        <QuestionProgress current={parseInt(questionId)} />
        <Stack
          bgColor="white"
          color="blackAlpha.800"
          px={5}
          py={6}
          rounded="md"
          shadow="lg"
          spacing={6}
        >
          <Heading as="h2" size="md">
            {he.decode(state.question)}
          </Heading>
          <Details category={state.category} difficulty={state.difficulty} />

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
            {parseInt(questionId) === 9 ? "Finish" : "Next"}
          </Button>
        </Stack>
      </Stack>
    );
  }
};

export default QuestionBox;
