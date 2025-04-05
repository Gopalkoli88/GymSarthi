import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  //  baseURL: "https://gym-house-1.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUsersDetails = createAsyncThunk(
  "trainer/planUserInfo",
  async (userIds) => {
    const userDetails = await Promise.all(
      userIds.map((userId) => api.get(`/user/userinfo/${userId}`))
    );

    return userDetails.map((response) => response.data);
  }
);

export const getallPlansofTrainer = createAsyncThunk(
  "trainer/allPlans",
  async (_, { getState }) => {
    try {
      const state = getState();
      const id = state.user.user._id;
      const response = await api.get(`/trainer/plans/${id}`);

      return response.data;
    } catch (error) {
      console.log("error from getAllplansofTrainer :", error);
    }
  }
);

export const createTaskForMember = createAsyncThunk(
  "trainer/createTasks",
  async (taskData, thunkAPI) => {
    try {
      console.log("task data :", taskData);
      const response = await api.post(`/task/plan`, taskData);

      console.log("task response :", response);
      return response.data;
    } catch (error) {
      console.log("error from createTaskForMembers :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTrainerInfo = createAsyncThunk(
  "trainer/info",
  async (_, { getState }) => {
    try {
      const state = getState();
      const trainerId = state.user.user._id;
      const response = await api.get(`/trainer/${trainerId}`);

      return response.data;
    } catch (error) {
      console.log("error from getTrainerInfo :", error);
    }
  }
);

export const updateTrainerInfo = createAsyncThunk(
  "trainer/updateInfo",
  async ({ trainerId, trainerData }) => {
    try {
      // const state = getState();
      // const trainerId = state.user.user._id;

      console.log("varify update trainer information :", trainerData);
      const response = await api.put(`/trainer/${trainerId}`, trainerData);
      console.log("trainer update : ", response);

      console.log("updated tariner info :", response);

      return response.data;
    } catch (error) {
      console.log("error from updateTrainerInfo :", error);
      // return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTrainerProfileInfo = createAsyncThunk(
  "trainer/profileUpdateInfo",
  async (trainerData , { getState, thunkAPI }) => {
    try {
      const state = getState();
      const trainerId = state.user.user._id;

      console.log("varify update trainer information :", trainerData);
      const response = await api.put(
        `/trainer/profile/${trainerId}`,
        trainerData
      );
      console.log("trainer update : ", response);

      console.log("updated tariner info :", response);

      return response.data;
    } catch (error) {
      console.log("error from updateTrainerInfo :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    plans: [],
    trainerInfo: null,
    planUserDetails: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getallPlansofTrainer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plans = action.payload;
      })
      .addCase(createTaskForMember.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchUsersDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.planUserDetails = action.payload;
      })
      .addCase(getTrainerInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trainerInfo = action.payload;
      })
      .addCase(updateTrainerInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trainerInfo = action.payload;
      })
      .addCase(updateTrainerProfileInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trainerInfo = action.payload;
      });
  },
});

export default trainerSlice.reducer;
