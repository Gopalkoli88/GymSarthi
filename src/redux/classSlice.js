// redux/classSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { api } from "./adminSlice";

export const createClass = createAsyncThunk(
  "class/create",
  async (classData, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.post("/class/admin/classes", classData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.class;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create class" }
      );
    }
  }
);

export const fetchClasses = createAsyncThunk(
  "class/fetch",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.get("/class/classes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.classes;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch classes" }
      );
    }
  }
);

export const bookClass = createAsyncThunk(
  "class/book",
  async (classId, { getState, rejectWithValue }) => {
    const { token, user } = getState().user;
    try {
      const response = await api.post(
        `/class/classes/${classId}/book`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { classId, userId: user._id, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to book class" }
      );
    }
  }
);

export const fetchTrainerSchedule = createAsyncThunk(
  "class/trainerSchedule",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.get("/class/trainer/schedule", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.classes;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch schedule" }
      );
    }
  }
);

export const cancelBooking = createAsyncThunk(
  "class/cancel",
  async (classId, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    const userId = getState().user.user._id;
    try {
      const response = await api.delete(`/class/classes/${classId}/book`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { classId, userId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to cancel booking" }
      );
    }
  }
);
const classSlice = createSlice({
  name: "class",
  initialState: {
    classes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createClass.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes.push(action.payload);
      })
      .addCase(createClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchClasses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(bookClass.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userId, classId } = action.payload;
        const cls = state.classes.find((c) => c._id === classId);
        if (cls && !cls.bookings.includes(userId)) cls.bookings.push(userId);
      })
      .addCase(bookClass.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchTrainerSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.classes = action.payload;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.status = "succeeded";
        const cls = state.classes.find((c) => c._id === action.payload.classId);
        if (cls) {
          const userId = action.payload.userId;
          cls.bookings = cls.bookings.filter(
            (id) => id.toString() !== userId.toString()
          );
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default classSlice.reducer;
