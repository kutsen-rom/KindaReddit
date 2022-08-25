import { createSlice } from "@reduxjs/toolkit";

export const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: {
        term: ''
    },
    reducers: {
        setTerm: (state, action) => {
            state.term = action.payload
        }
    }
})

export const selectTerm = state => state.searchBar.term;
export const { setTerm } = searchBarSlice.actions;

export default searchBarSlice.reducer