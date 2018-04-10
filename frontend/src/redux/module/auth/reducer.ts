import {shallowMerge} from "typescript-object-utils";

import {reducerFactory} from "../../ReducerFactory";
import {authActions, LoggedIn} from "./index";

export interface AuthState {
	id?: string;
	name?: string;
}

export const initialAuthState: AuthState = {};

const handlers = {
	[authActions.loggedIn]: (state: AuthState, action: LoggedIn) => {
		return shallowMerge(state, action.payload);
	},
	[authActions.logout]: (state: AuthState) => {
		return initialAuthState;
	}
};

export const authReducer = reducerFactory(handlers, initialAuthState);
