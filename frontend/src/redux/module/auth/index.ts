import {StandardAction} from "../../Action";

export const authActions = {
	register: "auth/Register",
	login: "auth/Login",
	logout: "auth/Logout",
	loggedOut: "auth/LoggedOut",
	initReset: "auth/initReset",
	reset: "auth/Reset",
	loggedIn: "auth/LoggedIn",
	check: "auth/Check"
};

export class AuthActions {
	public static register(name: string, email: string, password: string): Register {
		return {
			type: authActions.register,
			payload: {name, email, password}
		};
	}

	public static login(email: string, password: string): Login {
		return {
			type: authActions.login,
			payload: {email, password}
		};
	}

	public static logout(): StandardAction<void> {
		return {
			type: authActions.logout,
			payload: undefined
		};
	}

	public static loggedOut(): StandardAction<void> {
		return {
			type: authActions.loggedOut,
			payload: undefined
		};
	}

	public static initReset(email: string): InitReset {
		return {
			type: authActions.initReset,
			payload: {email}
		};
	}

	public static reset(token: string, password: string): Reset {
		return {
			type: authActions.reset,
			payload: {token, password}
		};
	}

	public static loggedIn(id: string, name: string): LoggedIn {
		return {
			type: authActions.loggedIn,
			payload: {id, name}
		};
	}

	public static check(): StandardAction<void> {
		return {
			type: authActions.check,
			payload: undefined
		};
	}
}

export type Register = StandardAction<{ name: string, email: string, password: string }>;
export type Login = StandardAction<{ email: string, password: string }>;
export type InitReset = StandardAction<{ email: string }>;
export type Reset = StandardAction<{ token: string, password: string }>;
export type LoggedIn = StandardAction<{ name: string, id: string }>;
