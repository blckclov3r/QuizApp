import {configureStore} from "@reduxjs/toolkit"
import quizReducer from '../features/quiz/quizSlice'

export const store = configureStore({
    reducer: {
        quiz: quizReducer
    }
});