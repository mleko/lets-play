import {Client} from "../../../infrastructure/http/Client";
import {Action, Dispatch, HandlerMap, Middleware, ReduceResult, ReduceResultType} from "../../Middleware";
import {authActions, Register, Reset} from "./index";

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
		[authActions.login]: (action: Reset) => {
			this.client.request({
				method: "POST",
				url: "/auth/login",
				data: action.payload
			});
			return ReduceResult.DONT_STORE;
		}
	};

	public constructor(private client: Client) {
	}

	public reduce(action: Action, dispatch: Dispatch, getState: () => any): ReduceResultType {
		if (this.handlers.hasOwnProperty(action.type)) {
			return this.handlers[action.type](action, dispatch, getState);
		}
	}

}