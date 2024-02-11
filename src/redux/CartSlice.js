import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        addedProducts: []
    },
    reducers: {
        addProduct(state, action){
            state.addedProducts.push(action.payload)
        }
    }
})

export const {addProduct} = CartSlice.actions;
export default CartSlice.reducer;