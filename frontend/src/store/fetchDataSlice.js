import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../components/config";
const fetchDataSlice = createSlice({
  name: "fetchData",
  initialState:{
    category: "",
    // token: "",
    token: localStorage.getItem("token") || "",
    // questions: [],
    questions: JSON.parse(localStorage.getItem("questions")) || [], // Retrieve questions from localStorage

    pdfData: JSON.parse(localStorage.getItem("pdfData")) || null,
  },
  reducers: {
    setCategory: (state,action) => {
      state.category = action.payload;
    },
    setToken: (state,action) => {
      // state.token = action.payload;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setQuestions: (state,action) => {
      state.questions = action.payload;
      localStorage.setItem("questions", JSON.stringify(action.payload)); // Store questions in localStorage
    },

    setPdfData: (state, action) => {
      state.pdfData = action.payload;
      localStorage.setItem("pdfData",JSON.stringify(action.payload));
    }
  }
})

export async function fetchQuestion(category,token,dispatch){

      const response = await fetch(`${API_URL}/question/category/${category}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if(!response.ok){
        await dispatch(fetchDataAction.setQuestions([]))
        return false;
      }
      else{

        const questions = await response.json();
        await dispatch(fetchDataAction.setQuestions(questions));
        return true;
      } 

}
export default fetchDataSlice;
export const fetchDataAction = fetchDataSlice.actions;