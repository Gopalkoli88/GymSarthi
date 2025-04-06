import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import trainerReducer from "./trainerSlice";
import adminReducer from "./adminSlice";
import classReducer from "./classSlice";
import loadingReducer from "./loadingSlice";
import aiPlanReducer from "./aiPlanSlice";
import feedbackReducer from "./feedbackSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedTrainerReducer = persistReducer(persistConfig, trainerReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);
const persistedClassReducer = persistReducer(persistConfig, classReducer);
const persistedLoadingReducer = persistReducer(persistConfig, loadingReducer);
const persistedAiPlanReducer = persistReducer(persistConfig, aiPlanReducer);
const persistedFeedbackReducer = persistReducer(persistConfig, feedbackReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    trainer: persistedTrainerReducer,
    admin: persistedAdminReducer,
    class: persistedClassReducer,
    loading: persistedLoadingReducer,
    aiPlan: persistedAiPlanReducer,
    feedback: persistedFeedbackReducer,
  },
});

export const persistor = persistStore(store);

export default store;
