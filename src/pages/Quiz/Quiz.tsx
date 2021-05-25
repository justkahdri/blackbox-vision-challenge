import { Heading, Stack, Progress, useTimeout } from '@chakra-ui/react';
import AppContext from '../../context';
import React, {useEffect, useContext, useState} from 'react'
import {Redirect} from 'react-router';

const Quiz = () => {
  let questions = useContext(AppContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://opentdb.com/api.php?amount=10');
      const formatted = await response.json()
      questions = formatted.results
    }

    setTimeout(() => setRedirect(true), 5000);

    fetchData();

  }, [])
  return (questions && redirect) ? (
    <Redirect to='/quiz/1' />
  ) : (
    <Stack>
      <Heading>All ready?</Heading>
      <Progress size="xs" isIndeterminate />
    </Stack>
  )
}

export default Quiz;
