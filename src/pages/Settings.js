import {Typography, Box,Button, CircularProgress } from '@mui/material'
import SelectField from '../components/SelectField'
import TextFieldComp from '../components/TextFieldComp';
import { useAxios } from '../hooks/useAxios';
import {useNavigate} from 'react-router-dom';

import {useSelector} from 'react-redux';



export default function Settings() {

    const {
        categories,
        question_categories,
        question_difficulty,
        question_type,
        amount_of_question,
        status
      } = useSelector(state=>state.quiz);

    const selectEmpty = [question_categories,question_difficulty,question_type,amount_of_question].every(Boolean)

    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        navigate('/questions')
    }

  
   if(status === 'loading'){
    return (
        <Box mt={10}>
            <CircularProgress />
        </Box>
    )
   }


   const difficultyOptions = [
        {id: "easy", name: "Easy"},
        {id: "medium", name: "Medium"},
        {id: "hard", name: "Hard"},
   ]

   const selectTypeOptions = [
        {id: "multiple", name: "Multiple"},
        {id: "boolean", name: "True / False"}
   ]


  return (
    <>
        <Typography variant="h2" color="#006699" fontWeight={"bold"}>Quiz App</Typography>
        <form onSubmit={handleSubmit}>
            <SelectField label={"Category"} options={categories}  />
            <SelectField label={"Difficulty"} options={difficultyOptions}  />
            <SelectField label={"Type"} options={selectTypeOptions}  />
            <TextFieldComp />

            <Box mt={3} width="100%">
                <Button fullWidth variant="contained" type="submit" disabled={!selectEmpty}>Get Started</Button>
            </Box>
        </form>
    </>
  )
}
