import React, { useEffect } from 'react'
import {Typography,Button,Box} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { reset } from '../features/quiz/quizSlice'
import {  toast } from 'react-toastify';

export default function FinalScore() {

  const score = useSelector((state)=>state.quiz.score)

  toast(`Congratulation!, your score is: ${score}`);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    question_categories,
  } = useSelector(state=>state.quiz);

  useEffect(() => {
    if(question_categories === ""){
      dispatch(reset());
      navigate('/')
    }
  }, [navigate,question_categories,dispatch]);


  const handleClickBack = () =>{
    dispatch(reset());
    navigate('/');
  }



  return (
    <>
      <Box mt={30}>
      <Typography variant="h3" color="initial">Final Score: <span style={{color: 'blue'}}>{score}</span></Typography>
      <br/>
      <Button  variant="outlined" onClick={handleClickBack}> Back to Settings! </Button>
    </Box>

    </>
  )
}
