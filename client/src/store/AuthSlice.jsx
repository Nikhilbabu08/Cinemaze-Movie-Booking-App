import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        admin: JSON.parse(localStorage.getItem('admin')) || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
            localStorage.setItem('admin', JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.admin = null;
            localStorage.removeItem('admin');
        },
        setUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
        userLogout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        }
    }
})

export const {setAdmin,adminLogout,setUser,userLogout} = authSlice.actions

export default authSlice.reducer;