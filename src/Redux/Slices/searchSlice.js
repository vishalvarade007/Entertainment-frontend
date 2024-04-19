import {createSlice} from "@reduxjs/toolkit";

const initalState = {
    searchInput:[]
};

const search = createSlice({
    name:"search",
    initialState:initalState,
    reducers:{
        //reducer to set searchinput in state
        setsearchInput:(state,action)=>{
            state.searchInput = action.payload
        }
    }
});

//exporting action creators 
export const {setsearchInput} = search.actions;

//exporting reducers
export default search.reducer;