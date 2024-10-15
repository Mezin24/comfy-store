import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const themes = {
  dracula: 'dracula',
  winter: 'winter',
};

const LS_THEME_KEY = 'comfy-theme';
const LS_USER = 'comfy-user';

const getInitialTheme = () => {
  const theme = localStorage.getItem(LS_THEME_KEY) || themes.dracula;
  document.querySelector('html').setAttribute('data-theme', theme);
  return theme;
};

const getInitialUser = () => {
  return JSON.parse(localStorage.getItem(LS_USER)) || null;
};

const initialState = {
  user: getInitialUser(),
  theme: getInitialTheme(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      const user = { ...payload.user, token: payload.jwt };
      localStorage.setItem(LS_USER, JSON.stringify(user));
      state.user = user;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem(LS_USER);
      toast.success('Logged out successfuly');
    },
    toggleTheme: (state) => {
      state.theme =
        state.theme === themes.dracula ? themes.winter : themes.dracula;
      document.querySelector('html').setAttribute('data-theme', state.theme);

      localStorage.setItem(LS_THEME_KEY, state.theme);
    },
  },
});

export const {
  actions: { loginUser, logoutUser, toggleTheme },
  reducer: userReducer,
} = userSlice;
