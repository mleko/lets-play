import {Client} from "../../../infrastructure/http/Client";
import {Response} from "../../../infrastructure/http/Response";
import {StandardAction} from "../../Action";
import {Action, Dispatch, HandlerMap, Middleware, ReduceResult} from "../../Middleware";
import {RoutingActions} from "../routing";
import {SnackbarActions} from "../snackbar";
import {AuthActions, authActions, InitReset, Login, Register, Reset} from "./index";

export class AuthMiddleware implements Middleware<any> {

	private handlers: HandlerMap<any> = {
		[authActions.register]: (action: Register, dispatch: Dispatch) => {
			this.client.request({
				method: "POST",
				url: "/auth/register",
				data: action.payload
			}).then((response: { token: string }) => {
				this.client.requestDefaults.headers["Authorization"] = "Bearer " + response.token;
				localStorage.setItem("authToken", response.token);
				dispatch(AuthActions.check());
			});
			return ReduceResult.DONT_STORE;
		},
		[authActions.initReset]: (action: InitReset, dispatch: Dispatch) => {
			this.client
				.request({
					method: "POST",
					url: "/auth/reset",
					data: action.payload
				})
				.then(() => {
					dispatch(SnackbarActions.message("Check email"));
				});
			return ReduceResult.DONT_STORE;
		},
		[authActions.reset]: (action: Reset, dispatch: Dispatch) => {
			this.client
				.request({
					method: "PUT",
					url: "/auth/reset",
					data: action.payload
				})
				.then(() => {
					dispatch(SnackbarActions.message("Password reset"));
					dispatch(RoutingActions.redirect("/login"));
				})
				.catch(() => {
					dispatch(SnackbarActions.message("Error occurred"));
				});
			return ReduceResult.DONT_STORE;
		},
		[authActions.login]: (action: Login, dispatch: Dispatch) => {
			this.client.request({
				method: "POST",
				url: "/auth/login",
				data: action.payload
			}).then((response: { token: string }) => {
				this.client.requestDefaults.headers["Authorization"] = "Bearer " + response.token;
				localStorage.setItem("authToken", response.token);
				dispatch(AuthActions.check());
			});
			return ReduceResult.DONT_STORE;
		},
		[authActions.check]: (action: StandardAction<void>, dispatch: Dispatch) => {
			const token = localStorage.getItem("authToken");
			if (token) {
				this.client.requestDefaults.headers["Authorization"] = "Bearer " + token;
			} else {
				dispatch(AuthActions.loggedOut());
				return ReduceResult.DONT_STORE;
			}
			this.client.request({
				method: "GET",
				url: "/auth"
			}).then((response: Response<any>) => {
				dispatch(AuthActions.loggedIn(response.data.id, response.data.name));
			}).catch(() => {
				dispatch(AuthActions.loggedOut());
			});
			return ReduceResult.DONT_STORE;
		},
		[authActions.logout]: (action: StandardAction<void>, dispatch: Dispatch) => {
			localStorage.removeItem("authToken");
			this.client.requestDefaults.headers["Authorization"] = undefined;
			this.client.request({
				method: "GET",
				url: "/auth/logout"
			}).then(() => {
				dispatch(AuthActions.loggedOut());
				dispatch(SnackbarActions.message("Wylogowano"));
			});
			return ReduceResult.DONT_STORE;
		}
	};

	public constructor(private client: Client) {
	}

	public reduce(action: Action, dispatch: Dispatch, getState: () => any): ReduceResult {
		if (this.handlers.hasOwnProperty(action.type)) {
			return this.handlers[action.type](action, dispatch, getState);
		}
		return ReduceResult.STORE;
	}

}
