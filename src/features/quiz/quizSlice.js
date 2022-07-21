import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = "https://opentdb.com/";

const namespace = 'quiz';

const initialState = {
    categories: [],
    question_categories: "",
    question_difficulty: "",
    question_type: "",
    amount_of_question: 10,
    score: 0,
    status: "idle"
}

export const fetchCategories = createAsyncThunk(`${namespace}/fetchCategories`,async ()=>{
    try {
        const response = await axios.get('api_category.php');
        return response?.data.trivia_categories;
    } catch (error) {
        console.log('fetchQuestions=>',error);
    }
});

export const quizSlice = createSlice({
    name: namespace,
    initialState,
    reducers:{
        reset: (state,action)=>{
            state.question_categories = ""
            state.question_difficulty = ""
            state.question_type = ""
            state.amount_of_question = 10
            state.score = 0
        },
        setCategory: (state,action)=>{
            state.question_categories = action.payload;
        },
        setDifficulty: (state,action)=>{
            state.question_difficulty = action.payload;
        },
        setType: (state,action)=>{
            state.question_type = action.payload;
        },
        setScore: (state,action)=>{
            state.score = state.score += parseInt(action.payload);
        },
        setAmount: (state,action)=>{
            state.amount_of_question = action.payload;
        }
    },
    extraReducers: (builder)=> {
        builder.addCase(fetchCategories.pending,(state,action)=>{
            state.status = 'loading';
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.categories = action.payload;
            state.status = 'idle';
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status = 'error';
        })
    }
});
export const {setCategory,setDifficulty,setType,setAmount,setScore,reset} = quizSlice.actions;
export default quizSlice.reducer;