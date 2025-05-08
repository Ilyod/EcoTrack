import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk pour appeler l'API
export const fetchApiMessage = createAsyncThunk('api/fetchMessage', async () => {
  const res = await fetch('http://localhost:5000/api');
  const data = await res.text();
  return data;
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    message: '',
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApiMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(fetchApiMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
