import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message'

export const login = createAsyncThunk(
    "auth/login",
    async(config) => {
        
        return axios(config).then(function (response) {
            if(!response.data.success){
                Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: response.data.message
                })
            }
            return response.data
            }).catch(function (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Warning',
                    text2: error.message
                })
                return error
            });
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        userFirstVisit: true,
        userLoggedIn: false,
        loading: false,
        success: false,
        data: {},
        token: "",
        seller: false,
        blockedPosts: []
    },
    reducers: {
        logout(state){
            state.userLoggedIn = false
            state.success = false
            state.loading = false
            state.data = {}
            state.seller=false
            state.token = ""
        },
        setUserFirstVisit(state, action){
            state.userFirstVisit = action.payload
        },
        updateUserData(state, action){
            state.data = action.payload
        },
        updateSellerState(state, action){
            state.seller = true
        },
        addToBlockedPosts(state, action){
            state.blockedPosts.push(action.payload)
        }
    },
    extraReducers(builder){
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            
        }).addCase(login.fulfilled, (state, action) => {
            
            state.loading = false
            state.userLoggedIn = action.payload.success
            state.success = action.payload.success
            state.token = action.payload.token
            state.data = action.payload.data
            state.seller = action.payload.seller
            
        }).addCase(login.rejected, (state, action) => {
            state.loading = false

            // state.error = action.payload
        })
    }
})

export const {logout, setUserFirstVisit, updateUserData, updateSellerState, addToBlockedPosts} = AuthSlice.actions;
export default AuthSlice.reducer;