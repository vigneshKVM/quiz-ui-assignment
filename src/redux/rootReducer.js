import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authReducer from "./auth/auth.reducer";

const persistConfigs = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default persistReducer(persistConfigs, rootReducer);
