import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-water-bac.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  '/auth/register',
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post('/auth/register', newUser);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logInGoogle = createAsyncThunk(
  'auth/google-login',
  async (code, thunkAPI) => {
    try {
      const response = await axios.post('/auth/google-login', { code });
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (userInfo, thunkAPI) => {
    try {
      const response = await axios.post('/auth/login', userInfo);
      setAuthHeader(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await axios.post('/auth/logout');
    clearAuthHeader();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const refreshUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     try {
//       const reduxState = thunkAPI.getState();
//       //* v1
//       // setAuthHeader(reduxState.auth.accessToken);
//       // const res = await axios.get("/water");
//       // return res.data;
//       // const { accessToken } = reduxState.auth;
//       // if (!accessToken) {
//       //   throw new Error('Cannot refresh user');
//       // }

//       const response = await axios.post('/auth/refresh');
//       console.log('New accessToken:', response.data.accessToken);
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   },

//   {
//     condition(_, thunkAPI) {
//       const reduxState = thunkAPI.getState();
//       return reduxState.auth.accessToken !== null;
//     },
//   }
// );
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const response = await axios.post('/auth/refresh');
      return response.data;
    } catch (error) {
      if (error.status == 401) {
        clearAuthHeader();
        let authData = localStorage.getItem('persist:auth');
        if (authData) {
          authData = JSON.parse(authData);
        } else {
          console.error("Key 'persist:auth' not found in localStorage.");
        }
        authData.token = 'null';
        const updatedAuthData = JSON.stringify(authData);
        localStorage.setItem('persist:auth', updatedAuthData);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
