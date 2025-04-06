import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAdminInfo = createAsyncThunk(
  "admin/getInfo",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const adminId = state.user.user._id;
      const response = await api.get(`/admin/${adminId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAdminInfo = createAsyncThunk(
  "admin/updateInfo",
  async (adminData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const adminId = state.user.user._id;
      const response = await api.put(`/admin/update/${adminId}`, adminData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getPurchasedAndNonPurchased = createAsyncThunk(
  "admin/purchased&nonPurchased",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMember = createAsyncThunk(
  "admin/userDelete",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllPlans = createAsyncThunk(
  "admin/allPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/plan/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllTrainers = createAsyncThunk(
  "admin/getAllTrainers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/trainer/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createPlan = createAsyncThunk(
  "admin/createPlan",
  async (planData, { rejectWithValue }) => {
    try {
      const response = await api.post("/plan/", planData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "admin/deletePlan",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/plan/${planId}`);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "admin/updatePlan",
  async ({ planId, planData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/plan/${planId}`, planData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createTrainer = createAsyncThunk(
  "admin/createTrainer",
  async (trainerData, { rejectWithValue }) => {
    try {
      const response = await api.post("/trainer/", trainerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteTrainer = createAsyncThunk(
  "admin/deleteTrainer",
  async (trainerId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/trainer/${trainerId}`);
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllPayments = createAsyncThunk(
  "admin/getAllPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/payment/payments");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "admin/getUserInfo",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/userinfo/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const getPlanInfo = createAsyncThunk(
  "admin/getPlanInfo",
  async (planId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/plan/${planId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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

export const fetchMembershipGrowthByMonth = createAsyncThunk(
  "admin/fetchMembershipGrowthByMonth",
  async (year, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/membership-growth/${year}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPlanPurchaseByMonth = createAsyncThunk(
  "admin/fetchPlanPurchaseByMonth",
  async (year, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/plan-purchases/${year}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMonthlyRevenue = createAsyncThunk(
  "admin/fetchMonthlyRevenue",
  async (year, { rejectWithValue }) => {
    try {
      const response = await api.get(`admin/monthly-revenue/${year}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
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
