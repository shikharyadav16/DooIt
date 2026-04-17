import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setIsAuthenticated, setUser} = authSlice.actions;
export default authSlice.reducer;