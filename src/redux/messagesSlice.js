import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { api } from "./adminSlice";

// Async thunk for fetching messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (conversationId) => {
    const response = await api.get(`/messages/${conversationId}`);
    return response.data;
  }
);

// Async thunk for sending a new message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (messageData) => {
    const response = await api.post("/messages", messageData);
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.push(action.payload); // Add the new message to the state
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default messagesSlice.reducer;
