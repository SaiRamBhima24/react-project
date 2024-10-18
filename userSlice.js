import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log('Registering user: ', action.payload);
      state.users.push(action.payload);
    },
  },
});

export const { registerUser } = userSlice.actions;

export default userSlice.reducer;
