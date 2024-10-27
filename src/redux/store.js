import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import trainerReducer from "./trainerSlice";
import adminReducer from "./adminSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedTrainerReducer = persistReducer(persistConfig, trainerReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    trainer: persistedTrainerReducer,
    admin: persistedAdminReducer,
  },
});

export const persistor = persistStore(store);

export default store;
