import {Client} from "../../../infrastructure/http/Client";
import {Response} from "../../../infrastructure/http/Response";
import {Action, Dispatch, HandlerMap, Middleware, ReduceResult} from "../../Middleware";
import {AuthActions, authActions, Login, Register, Reset} from "./index";
import {StandardAction} from "../../Action";

export class AuthMiddleware implements Middleware<any> {

	private handlers: HandlerMap<any> = {
		[authActions.register]: (action: Register) => {
			this.client.request({
				method: "POST",
				url: "/auth/register",
				data: action.payload
			});
			return ReduceResult.DONT_STORE;
		},
		[authActions.reset]: (action: Reset) => {
			this.client.request({
				method: "POST",
				url: "/auth/reset",
				data: action.payload
			});
			return ReduceResult.DONT_STORE;
		},
		[authActions.login]: (action: Login, dispatch: Dispatch) => {
			this.client.request({
				method: "POST",
				url: "/auth/login",
				data: action.payload
			}).then((response: Response<any>) => {
				dispatch(AuthActions.loggedIn(response.data.id, response.data.name));
			});
			return ReduceResult.DONT_STORE;
		},
		[authActions.check]: (action: StandardAction<void>, dispatch: Dispatch) => {
			this.client.request({
				method: "GET",
				url: "/auth"
			}).then((response: Response<any>) => {
				dispatch(AuthActions.loggedIn(response.data.id, response.data.name));
			}).catch(() => {
				dispatch(AuthActions.logout());
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
