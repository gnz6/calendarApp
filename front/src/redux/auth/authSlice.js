import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        status: "checking",
        user : {},
        errorMessages: null,
    },
    reducers:{
        checking: (state) => {
            state.status = "checking";
            state.user = {};
            state.errorMessages = null;
        },
        onLogin: (state, {payload}) => {
            state.status = "authenticated";
            state.user = payload;
            state.errorMessages = null;
        },
        onLogout : (state, {payload}) =>{
            state.status = "non-authenticated"
            state.errorMessages = payload
            state.user = {}
        },
        clearErrorMessage:(state)=>{
            state.errorMessages = null
        },

    }
})


export const { checking, onLogin, onLogout, clearErrorMessage } = authSlice.actions