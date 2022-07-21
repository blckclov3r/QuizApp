import React from 'react'
import {Box, FormControl, TextField} from '@mui/material';
import {useDispatch} from 'react-redux';
import { setAmount } from '../features/quiz/quizSlice';

export default function TextFieldComp() {
 
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if(e.target.value === "" || e.target.value === 0){
            dispatch(setAmount(10))
            return;
        }
        dispatch(setAmount(e.target.value))
    }
  return (
    <Box mt={3} width="100%">
        <FormControl fullWidth size='sm'>
            <TextField 
                defaultValue={10}
                onChange={handleChange}
                variant="outlined"
                label="Amount of Questions"
                type="number"
                size="sm"
            />
         </FormControl>
    </Box>
  )
}
 