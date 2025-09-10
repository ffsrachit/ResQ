import { createSlice } from "@reduxjs/toolkit";

const disasterslice = createSlice({
    name:"disaster",
    initialState:{
        disaster:[],

    },
    reducers:{
        setallDisaster:(state,action)=>{
            state.disaster = action.payload;
        }
    }
});

export const {setallDisaster} = disasterslice.actions;
export default disasterslice.reducer;