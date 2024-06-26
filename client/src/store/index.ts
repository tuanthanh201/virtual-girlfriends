import { configureStore } from '@reduxjs/toolkit';
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import { authReducer } from './auth/authSlice';
import { chatReducer } from './chat/chatSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		chat: chatReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
