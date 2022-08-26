import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: localStorage.getItem('theme')
    } ,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export const selectTheme = state => state.theme.theme;

export default themeSlice.reducer
