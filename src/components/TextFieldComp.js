import React from 'react'
import {Box, FormControl, TextField} from '@mui/material'
export default function TextFieldComp() {
    const handleChange = () => {

    }
  return (
    <Box mt={3} width="100%">
        <FormControl fullWidth size='sm'>
            <TextField 
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
 