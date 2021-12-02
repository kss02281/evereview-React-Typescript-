import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  name: string;
  img_url: string;
}

interface InputUserInfo {
  inputName: string;
  nickName: string;
}

interface InputChannelInfo {
  category: string[];
  upload_term: number;
}

const initialState = {
  email: "",
  name: "",
  img_url: "",
  inputName: "",
  nickName: "",
  category: [] as string[],
  upload_term: 0,
};

// Define Actions & Reducer
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<User>) {
      const { email, name, img_url } = action.payload;
      state.email = email;
      state.name = name;
      state.img_url = img_url;
    },
    saveName(state, action: PayloadAction<InputUserInfo>) {
      const { inputName, nickName } = action.payload;
      state.inputName = inputName;
      state.nickName = nickName;
    },
    saveChannelInfo(state, action: PayloadAction<InputChannelInfo>) {
      const { category, upload_term } = action.payload;
      state.upload_term = upload_term;
      state.category = [...category];
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
