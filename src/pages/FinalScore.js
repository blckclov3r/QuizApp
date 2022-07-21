import React from 'react'
import {Typography,Button,Box} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { reset } from '../features/quiz/quizSlice'

export default function FinalScore() {

  const score = useSelector((state)=>state.quiz.score)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    question_categories,
    question_difficulty,
    question_type
  } = useSelector(state=>state.quiz);

  if(question_categories === "" || question_difficulty === "" || question_type === ""){
    navigate('/')
  }


  const handleClickBack = () =>{
    dispatch(reset());
    navigate('/');
  }

  return (
    <Box mt={30}>
      <Typography variant="h3" color="initial">Final Score {score}</Typography>
      <br/>
      <Button  variant="outlined" onClick={handleClickBack}> Back to Settings! </Button>
    </Box>
  )
}
