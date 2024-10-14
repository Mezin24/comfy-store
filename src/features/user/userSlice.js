import { createSlice } from '@reduxjs/toolkit';

export const themes = {
  dracula: 'dracula',
  winter: 'winter',
};

const LS_THEME_KEY = 'comfy-theme';

const getInitialTheme = () => {
  const theme = localStorage.getItem(LS_THEME_KEY) || themes.dracula;
  document.querySelector('html').setAttribute('data-theme', theme);
  return theme;
};

const initialState = {
  user: { username: 'Mezin' },
  theme: getInitialTheme(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      console.log('login');
    },
    logoutUser: (state) => {
      console.log('logout');
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
