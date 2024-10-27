import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://gym-house-1.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAdminInfo = createAsyncThunk(
  "admin/getInfo",
  async (_, { getState }) => {
    try {
      const state = getState();
      const adminId = state.user.user._id;
      console.log("adminid from adminslice :", adminId);
      const response = await api.get(`/admin/${adminId}`);

      return response.data;
    } catch (error) {
      console.log("error from getAdminInfo", error);
    }
  }
);

export const updateAdminInfo = createAsyncThunk(
  "admin/updateInfo",
  async (adminData, { getState }) => {
    try {
      console.log("previous amdin info :", adminData);
      const state = getState();
      const adminId = state.user.user._id;
      const response = await api.put(`/admin/update/${adminId}`, adminData);
      console.log("after update amdin info :", adminData);
      return response.data;
    } catch (error) {
      console.log("error from updateAdminInfo :", error);
    }
  }
);

export const getPurchasedAndNonPurchased = createAsyncThunk(
  "admin/purchased&nonPurchased",
  async () => {
    try {
      const response = await api.get("/admin");

      return response.data;
    } catch (error) {
      console.log("error from getpurchasedAndNonPurchased ", error);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "admin/userDelete",
  async (userId, { getState }) => {
    try {
      const state = getState();
      const token = state.user.token;

      const response = await api.delete(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.log("error from deleteMember :", error);
    }
  }
);

export const getAllPlans = createAsyncThunk("admin/allPlans", async () => {
  try {
    const response = await api.get("/plan/");

    return response.data;
  } catch (error) {
    console.log("error from getAllPlans :", error);
  }
});

export const getAllTrainers = createAsyncThunk(
  "admin/getAllTrainers",
  async () => {
    try {
      const response = await api.get("/trainer/");
      return response.data;
    } catch (error) {
      console.log("error from getAllTrainers :", error);
    }
  }
);

export const createPlan = createAsyncThunk(
  "admin/createPlan",
  async (planData) => {
    try {
      const response = await api.post("/plan/", planData);

      return response.data;
    } catch (error) {
      console.log("error from createPlan :", error);
      return false;
    }
  }
);

export const deletePlan = createAsyncThunk(
  "admin/deletePlan",
  async (planId) => {
    try {
      const response = await api.delete(`/plan/${planId}`);
      console.log("delete plan :", response);
      return true;
    } catch (error) {
      console.log("error from deletePlan :", error);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "admin/updatePlan",
  async ({ planId, planData }) => {
    console.log("varify update data :", planData);
    try {
      const response = await api.put(`/plan/${planId}`, planData);
      console.log("plan update :", response);

      return response.data;
    } catch (error) {
      console.log("Error from updatePlan :", error);
    }
  }
);

export const createTrainer = createAsyncThunk(
  "admin/createTrainer",
  async (trainerData, thunkAPI) => {
    console.log("Validate data of trainer :", trainerData);
    try {
      const response = await api.post("/trainer/", trainerData);

      return response.data;
    } catch (error) {
      console.log("error from create trainer :", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTrainer = createAsyncThunk(
  "admin/deleteTrainer",
  async (trainerId) => {
    try {
      const response = await api.delete(`/trainer/${trainerId}`);
      console.log("deleted trainer data:", response);
      return true;
    } catch (error) {
      console.log("error from delete trianer :", error);
    }
  }
);

export const getAllPayments = createAsyncThunk(
  "admin/getAllPayments",
  async () => {
    try {
      const response = await api.get("/payment/payments");

      return response.data;
    } catch (error) {
      console.log("error from getAllPayments :", error);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "admin/getUserInfo",
  async (userId) => {
    try {
      console.log("user id checking", userId);
      const response = await api.get(`/user/userinfo/${userId}`);
      return response.data;
    } catch (error) {
      console.log("error from getUserinfo from adminslice", error);
    }
  }
);
export const getPlanInfo = createAsyncThunk(
  "admin/getPlanInfo",
  async (planId) => {
    try {
      const response = await api.get(`/plan/${planId}`);
      return response.data;
    } catch (error) {
      console.log("error from getUserinfo from adminslice", error);
    }
  }
);

export const uploadPlanPhoto = createAsyncThunk(
  "user/uploadAdminPhoto",
  async ({ planId, photo }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("photo", photo);

      const response = await api.post(`/plan/uploadPhoto/${planId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.photoUrl; // Return the photo URL
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllFeedbacks = createAsyncThunk(
  "admin/getAllFeedbacks",
  async () => {
    try {
      const response = await api.get("/feedback/");

      console.log("response feedback data :", response);
      return response.data;
    } catch (error) {
      console.log("error from get all feedbacks admin.");
    }
  }
);

export const submitFeedback = createAsyncThunk(
  "admin/submitFeedback",
  async ({ comment }) => {
    try {
      const response = await api.post("/feedback/", comment, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response feedback data :", response);
      return response.data;
    } catch (error) {
      console.log("error from submit feedbacks admin.");
    }
  }
);

export const fetchMembershipGrowthByMonth = createAsyncThunk(
  "admin/fetchMembershipGrowthByMonth",
  async (year) => {
    try {
      const response = await api.get(`admin/membership-growth/${year}`);

      return response.data;
    } catch (error) {
      console.log(
        "error fom admin slice fetch memmbership growth by month :",
        error
      );
    }
  }
);

export const fetchPlanPurchaseByMonth = createAsyncThunk(
  "admin/fetchPlanPurchaseByMonth",
  async (year) => {
    try {
      const response = await api.get(`admin/plan-purchases/${year}`);
      return response.data;
    } catch (error) {
      console.log("error from adminslice fetch plan purchase by month");
    }
  }
);

export const fetchMonthlyRevenue = createAsyncThunk(
  "admin/fetchMonthlyRevenue",
  async (year) => {
    try {
      const response = await api.get(`admin/monthly-revenue/${year}`);
      return response.data;
    } catch (error) {
      console.log("error come from adminslice fetchmontlyrevenue", error);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminInfo: null,
    users: {
      purchased: [],
      nonPurchased: [],
    },
    plans: [],
    trainers: [],
    payments: [],
    feedbacks: {
      plans: [],
      trainers: [],
      all: [],
    },
    membershipGrowth: [],
    planPurchaseGrowth: [],
    monthlyRevenue: [],

    user: null,
    plan: null,
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminInfo.fulfilled, (state, action) => {
        state.adminInfo = action.payload;
      })
      .addCase(updateAdminInfo.fulfilled, (state, action) => {
        state.adminInfo = action.payload;
      })
      .addCase(getPurchasedAndNonPurchased.fulfilled, (state, action) => {
        state.users.purchased = action.payload.usersWithPlans;
        state.users.nonPurchased = action.payload.usersWithoutPlans;
      })
      .addCase(deleteMember.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(getAllPlans.fulfilled, (state, action) => {
        state.plans = action.payload;
      })
      .addCase(getAllTrainers.fulfilled, (state, action) => {
        state.trainers = action.payload;
      })
      .addCase(createPlan.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(createTrainer.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(deleteTrainer.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(getAllPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getPlanInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plan = action.payload;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedbacks.all = action.payload;
      })
      .addCase(submitFeedback.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(fetchMembershipGrowthByMonth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.membershipGrowth = action.payload;
      })
      .addCase(fetchPlanPurchaseByMonth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.planPurchaseGrowth = action.payload;
      })
      .addCase(fetchMonthlyRevenue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.monthlyRevenue = action.payload;
      });
  },
});

export default adminSlice.reducer;
