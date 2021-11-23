import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  name: string;
}

const initialState = {
  email: '',
  name: '',
};

// Define Actions & Reducer
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<User>) {
      const { email, name } = action.payload;
      state.email = email;
      state.name = name;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
