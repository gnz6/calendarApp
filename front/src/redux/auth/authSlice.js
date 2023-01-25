import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:"auth",
    initialState:{
        status: "checking",
        user : {},
        errorMessages: undefined,
    },
    reducers:{
        checking: (state) => {
            state.status = "checking";
            state.user = {};
            state.errorMessages = undefined;
        },
        onLogin: (state, {payload}) => {
            state.statuts = "authenticated";
            state.user = payload;
            state.errorMessages = undefined;
        }
    }
})


export const { checking } = authSlice.actions