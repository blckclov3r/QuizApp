import React from 'react'
import {Typography, Box,Button} from '@mui/material'
import SelectField from '../components/SelectField'
import TextFieldComp from '../components/TextFieldComp';
import { useAxios } from '../hooks/useAxios';

export default function Settings() {
    const {response,error,loading} = useAxios({url: 'api_category.php'});


    const handleSubmit = (e) =>{
        e.preventDefault();
    }


  return (
    <>
        <Typography variant="h2" color="#006699" fontWeight={"bold"}>Quiz App</Typography>
        <form onSubmit={handleSubmit}>
            <SelectField label={"Category"} categories={response?.trivia_categories}  />
            <SelectField label={"Difficulty"}  />
            <SelectField label={"Type"}  />
            <TextFieldComp />


            <Box mt={3} width="100%">
                <Button fullWidth variant="contained" type="submit">Get Started</Button>
            </Box>
        </form>
    </>
  )
}
