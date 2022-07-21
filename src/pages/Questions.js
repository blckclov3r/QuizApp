import {Box, Typography,Button,CircularProgress} from '@mui/material'
import {useSelector, useDispatch} from 'react-redux';
import {  useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { reset, setScore } from '../features/quiz/quizSlice';
import {decode} from 'html-entities';
import {useQuery} from 'react-query'
import axios from 'axios'
import {  toast } from 'react-toastify';


// random integer not beyond in (max) parameter
const getRandomInt = (max) =>{
    return Math.floor(Math.random() * Math.floor(max));
}

export default function Questions() {

  const [questionIndex,setQuestionIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const {
    question_categories,
    question_difficulty,
    question_type,
    score,
    amount_of_question,
    loading
  } = useSelector(state=>state.quiz);


  useEffect(() => {
    if(question_categories === ""){
        dispatch(reset())
        navigate("/");
      }
  }, [question_categories,navigate,dispatch]);



  const apiUrl = `/api.php?amount=${amount_of_question}&category=${question_categories}&difficulty=${question_difficulty}&type=${question_type}`;

  const fetchQuestions = async()=>{
    try{
        const response = await axios.get(apiUrl)
        return response?.data;
    }catch(err){
        console.log(err);
    }
  }


  const { data: response, isLoading } = useQuery(['QUESTIONS',questionIndex],fetchQuestions,{
      refetchOnWindowFocus: false,
      cacheTime: 0
    });
 
    
    let options = response?.results[questionIndex]?.incorrect_answers;
    options?.splice(getRandomInt(options.length),0,response?.results[questionIndex]?.correct_answer) 
 
  if(loading){
    return (
        <Box mt={10}>
            <CircularProgress />
        </Box>
    )
   }

   if(response?.response_code){
    return (
        <Box mt={10}>
               <Typography variant="h3" color="red">Something went wrong!</Typography>
               <Typography variant="body1">Please try again</Typography>
               <Typography variant="body1">Response code: {response?.response_code}</Typography>
      <br/>
      <Button  variant="outlined" onClick={()=>{
            dispatch(reset());
            navigate("/")
      }}> Back to Settings! </Button>
        </Box>
    )
   }


   const handleClickAnswer = (e) =>{
   
 
         const question = response?.results[questionIndex];
        //  console.log('correct answer: ',question?.correct_answer)
        if(e.target.textContent === question?.correct_answer){
            toast("CORRECT!");
            dispatch(setScore(1))
        }else{
            toast.error("WRONG!");
        }

        if(questionIndex + 1 < response?.results.length){
            setQuestionIndex(prevState => prevState +=1);
        }else{
            navigate("/score")
        }
   }

   if(isLoading){
    return (
        <Box mt={30}>
            <CircularProgress />
        </Box>
    )
   }
  return (
 
    <Box>
        <Typography variant="h4" color="initial">Question {questionIndex +1}</Typography>
        <Typography variant="body1" color="initial" mt={5}>{
                (typeof decode(response?.results[questionIndex]?.question) === 'string') ? decode(response?.results[questionIndex]?.question) : response?.results[questionIndex]?.question
        }</Typography>
         {
            options?.map((answer,index)=>(
                <Box mt={3} key={[answer,index]}>
                    <Button variant='contained' onClick={handleClickAnswer}>{
                       typeof answer === 'string' ? decode(answer) : answer
                    }</Button>
                </Box>
            ))
         }
        <Box mt={5}>
            Score: {score} / {response?.results?.length}
        </Box>
    </Box>
 
 
  )
}
