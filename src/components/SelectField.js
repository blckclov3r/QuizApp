import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useDispatch } from 'react-redux';
import { setCategory, setDifficulty, setType } from '../features/quiz/quizSlice';


export default function SelectField({ label, options }) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('');
  

    const handleChange = (e) => {
     
        switch (label) {
            case "Category":
                dispatch(setCategory(e.target.value));
                break;
            case "Difficulty":
                dispatch(setDifficulty(e.target.value));
                break;
            case "Type":
                dispatch(setType(e.target.value));
                break;
            default:
                return value;
        }

        setValue(e.target.value);
    }

    return (
        <Box mt={3} width="100%">
            <FormControl fullWidth size={"small"}>
                <InputLabel>{label}</InputLabel>
                <Select value={value} label={label} onChange={handleChange}>
                    {
                        options?.map((category) => (
                            <MenuItem value={category.id} key={category.id}>{category.name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
