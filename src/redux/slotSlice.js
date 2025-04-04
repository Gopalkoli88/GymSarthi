import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://gym-house-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Async actions for slot management

export const createSlot = createAsyncThunk(
  "slot/create",
  async (slotData, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.post("/slots/create", slotData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.slot;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to create slot" }
      );
    }
  }
);

export const fetchAvailableSlots = createAsyncThunk(
  "slot/fetchAvailable",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.get("/slots/available", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.slots;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch available slots" }
      );
    }
  }
);

export const fetchUserSlot = createAsyncThunk(
  "slot/fetchUserSlot",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.get("/slots/my-slot", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch user slot" }
      );
    }
  }
);

export const bookSlot = createAsyncThunk(
  "slot/book",
  async (slotId, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.post(
        "/slots/book",
        { slotId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { slotId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to book slot" }
      );
    }
  }
);

export const extendSlot = createAsyncThunk(
  "slot/extend",
  async (slotId, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.put(
        "/slots/extend",
        { slotId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { slotId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to extend slot" }
      );
    }
  }
);

export const cancelSlot = createAsyncThunk(
  "slot/cancel",
  async (slotId, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.delete("/slots/cancel", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { slotId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to cancel slot" }
      );
    }
  }
);

export const deleteSlot = createAsyncThunk(
  "slot/delete",
  async (slotId, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await api.delete(`/slots/${slotId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { slotId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to delete slot" }
      );
    }
  }
);

export const updateSlotByMember = createAsyncThunk(
  "slot/updateByMember",
  async ({ oldSlotId,newSlotId }, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {

        console.log( "varify old and new slot id : ",oldSlotId, newSlotId);
      const response = await api.put(
        `/slots/update`,
        { slotId:oldSlotId,newSlotId},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update slot" }
      );
    }
  }
);

export const updateSlotByAdmin = createAsyncThunk(
  "slot/updateByAdmin",
  async (
    { _id, startTime, endTime, maxCapacity },
    { getState, rejectWithValue }
  ) => {
    const { token } = getState().user;
    try {
      const response = await api.put(
        `/slots/update/${_id}`,
        { startTime, endTime, maxCapacity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.slot;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update slot" }
      );
    }
  }
);

// Slot slice
const slotSlice = createSlice({
  name: "slot",
  initialState: {
    slots: [],
    userslot: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSlot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.slots.push(action.payload);
      })
      .addCase(createSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.slots = action.payload;
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(fetchUserSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userslot = action.payload;
      })
      .addCase(fetchUserSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(bookSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        const slot = state.slots.find((s) => s._id === action.payload.slotId);
        if (slot) slot.bookedBy = action.payload.userId;
      })
      .addCase(bookSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(extendSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        const slot = state.slots.find((s) => s._id === action.payload.slotId);
        if (slot) slot.extended = true;
      })
      .addCase(extendSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(cancelSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        const slot = state.slots.find((s) => s._id === action.payload.slotId);
        if (slot) slot.bookedBy = null;
      })
      .addCase(cancelSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(deleteSlot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.slots = state.slots.filter(
          (s) => s._id !== action.payload.slotId
        );
      })
      .addCase(deleteSlot.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(updateSlotByMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        const slotIndex = state.slots.findIndex(
          (s) => s._id === action.payload._id
        );
        if (slotIndex !== -1) {
          state.slots[slotIndex] = action.payload;
        }
      })
      .addCase(updateSlotByMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(updateSlotByAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const slotIndex = state.slots.findIndex(
          (s) => s._id === action.payload._id
        );
        if (slotIndex !== -1) {
          state.slots[slotIndex] = action.payload;
        }
      })
      .addCase(updateSlotByAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default slotSlice.reducer;
