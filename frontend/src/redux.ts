import {combineReducers} from "redux";
import {authReducer, AuthState, initialAuthState} from "./redux/module/auth/reducer";
import {initialSnackbarState, snackbarReducer, SnackbarState} from "./redux/module/snackbar/reducer";

export interface AppState {
	auth: AuthState;
	snackbar: SnackbarState;
}

export const initialAppState: AppState = {
	auth: initialAuthState,
	snackbar: initialSnackbarState
};

export const appReducer = combineReducers({
	auth: authReducer,
	snackbar: snackbarReducer
});
