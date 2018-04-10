import {combineReducers} from "redux";
import {authReducer, AuthState, initialAuthState} from "./redux/module/auth/reducer";

export interface AppState {
	auth: AuthState;
}

export const initialAppState: AppState = {
	auth: initialAuthState
};

export const appReducer = combineReducers({
	auth: authReducer
});
