import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth-slice";
import notificationReducer from "./slices/notification-slice";
import authModalReducer from "./slices/auth-modal-slice";
import MobileReducer from "../../frontend/store";

const store = configureStore({
	reducer: {
		auth: authReducer,
		authModal: authModalReducer,
		notification: notificationReducer,
		pc: PCReducer,
		mobile: MobileReducer
	}
});

export default store;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<
	ReturnType<typeof store.getState>
> = useSelector;