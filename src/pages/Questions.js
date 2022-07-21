import {Box, Typography,Button,CircularProgress} from '@mui/material'
import { useAxios } from '../hooks/useAxios';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { setScore } from '../features/quiz/quizSlice';
import {decode} from 'html-entities';

// random integer not beyond in (max) parameter
const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max));
}


export default function Questions() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    question_categories,
    question_difficulty,
    question_type,
    score,
    amount_of_question
  } = useSelector(state=>state.quiz);


  const apiUrl = `/api.php?amount=${amount_of_question}&category=${question_categories}&difficulty=${question_difficulty}&type=${question_type}`;


  const {response, loading} = useAxios({url: apiUrl});
  const [questionIndex,setQuestionIndex] = useState(0);
  const [options, setOptions] = useState(null)

  useEffect(() => {
    if(response?.results.length > 0){
        const question = response.results[questionIndex];
        let answers = [...question?.incorrect_answers];
        console.log(question.correct_answer)
        answers.splice(
            getRandomInt(question?.incorrect_answers.length), 
            0,
            question?.correct_answer
        )
        setOptions(answers)
    }
  }, [questionIndex,response]);

 
  if(loading){
    return (
        <Box mt={10}>
            <CircularProgress />
        </Box>
    )
   }

  
   const handleClickAnswer = (e) =>{

         const question = response?.results[questionIndex];
        // console.log('correct answer: ',question?.correct_answer)

        if(e.target.textContent === question?.correct_answer){
            dispatch(setScore(1))
        }

        if(questionIndex + 1 < response?.results.length){
            setQuestionIndex(prevState => prevState +=1);
        }else{
            navigate("/score")
        }
       
   }
  return (
    <Box>
        <Typography variant="h4" color="initial">Question {questionIndex +1}</Typography>
        <Typography variant="body1" color="initial" mt={5}>{decode(response?.results[questionIndex]?.question)}</Typography>
         {
            options?.map((answer,index)=>(
                <Box mt={2} key={[answer,index]}>
                    <Button variant='contained' onClick={handleClickAnswer}>{decode(answer)}</Button>
                </Box>
            ))
         }
        <Box mt={5}>
            Score: {score} / {response?.results.length}
        </Box>
    </Box>
  )
}
