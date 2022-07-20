import React from 'react'
import {Box, FormControl, InputLabel, Select,MenuItem} from '@mui/material'

export default function SelectField({label,categories}) {
    console.log('cat',categories)
    const [value, setValue] = React.useState('');

    const handleChange = (e) =>{
        setValue(e.target.value);
    }

  return (
    <Box mt={3} width="100%">
        <FormControl fullWidth size={"small"}>
          <InputLabel>{label}</InputLabel>
   
        <Select value={value} label={label} onChange={handleChange}>
            {
                categories?.map((category)=>(
                    <MenuItem key={category.id}>{category.name}</MenuItem>
                ))
            }
        </Select>
        </FormControl>
    </Box>
  )
}
