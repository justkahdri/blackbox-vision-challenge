import React, {useState, useContext, useEffect} from "react";
import {Heading, Radio, Stack, Text, RadioGroup, Button, useToast} from "@chakra-ui/react";
import {Redirect, useParams} from "react-router";
import _ from "underscore";

import AppContext from "../../context";

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

      setState({
        ...state,
        ...rest,
        correct_answer,
        all_answers: [...incorrect_answers, correct_answer].sort(() => Math.random() - 0.5),
      });
    } catch (err) {
      setRedirect("/");
      // console.error(err);
    }

    return () => {
      setAnswerRadio("");
      setRedirect("");
    };
  }, [questionId]);

  if (redirect) {
    return <Redirect to={redirect} />;
  } else {
    return (
      <Stack bgColor="white" color="blackAlpha.800" p={5} rounded="md" shadow="lg">
        <Heading>Question #{questionId}</Heading>
        <Text>{_.unescape(state.question)}</Text>
        {
          <RadioGroup onChange={(value) => setAnswerRadio(value)}>
            <Stack direction={state.type == "boolean" ? "row" : "column"}>
              {state.all_answers.map((answer) => (
                <Radio key={answer} value={answer}>
                  {answer}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        }
        <Button isDisabled={!answerRadio} onClick={handleSubmit}>
          Next
        </Button>
      </Stack>
    );
  }
};

export default QuestionBox;
