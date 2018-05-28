import {shallowMerge} from "typescript-object-utils";

import {reducerFactory} from "../../ReducerFactory";
import {authActions, LoggedIn} from "./index";

export interface AuthState {
	id?: string;
	name?: string;
	established: boolean;
}

export const initialAuthState: AuthState = {established: false};

const handlers = {
	[authActions.loggedIn]: (state: AuthState, action: LoggedIn) => {
		return shallowMerge(shallowMerge(state, action.payload), {established: true});
	},
	[authActions.logout]: (state: AuthState) => {
		return {established: true};
	}
};

export const authReducer = reducerFactory(handlers, initialAuthState);
