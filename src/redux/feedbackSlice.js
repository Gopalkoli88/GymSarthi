// src/redux/feedbackSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "./adminSlice"; // axios instance

// 🔄 Submit Feedback
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await api.post("/feedback", feedbackData);
      return response.data; // expecting { status, data: { feedback } }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit feedback"
      );
    }
  }
);

// 🔁 Get All Feedbacks
export const getAllUserFeedbacks = createAsyncThunk(
  "feedback/getAllFeedbacks", // fixed namespace
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/feedback/user"); // expecting { status, data: { feedbacks } }
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch feedbacks"
      );
    }
  }
);

// 🧩 Feedback Slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedback: null, // for single feedback submitted
    allFeedbacks: [], // for fetched feedbacks list
    userFeedbacks: [],
    status: "idle", // loading state
    error: null, // error tracking
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🔄 Submit Feedback
      .addCase(submitFeedback.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedback = action.payload.data.feedback;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      })

      // 🔁 Get All Feedbacks
      .addCase(getAllUserFeedbacks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUserFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userFeedbacks = action.payload.data.populatedFeedback;
      })
      .addCase(getAllUserFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default feedbackSlice.reducer;
