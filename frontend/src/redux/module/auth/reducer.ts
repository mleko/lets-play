import {shallowMerge} from "typescript-object-utils";

import {User} from "../../../model/models";
import {reducerFactory} from "../../ReducerFactory";
import {authActions, LoggedIn} from "./index";

export interface AuthState {
	id?: string;
	name?: string;
	established: boolean;
	user?: User;
}

export const initialAuthState: AuthState = {established: false};

const handlers = {
	[authActions.loggedIn]: (state: AuthState, action: LoggedIn) => {
		return shallowMerge(shallowMerge(state, {...action.payload, user: action.payload}), {established: true});
	},
	[authActions.logout]: (state: AuthState) => {
		return {established: true};
	}
};

export const authReducer = reducerFactory(handlers, initialAuthState);
