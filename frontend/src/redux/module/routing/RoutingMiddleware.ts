import {History} from "history";
import {Action, Dispatch, HandlerMap, Middleware, ReduceResult} from "../../Middleware";
import {Redirect, routingActions} from "./index";

export class RoutingMiddleware implements Middleware<any> {

	private handlers: HandlerMap<any> = {
		[routingActions.redirect]: (action: Redirect) => {
			this.history.push(action.payload.url);
			return ReduceResult.DONT_STORE;
		}
	};

	public constructor(private history: History) {
	}

	public reduce(action: Action, dispatch: Dispatch, getState: () => any): ReduceResult {
		if (this.handlers.hasOwnProperty(action.type)) {
			return this.handlers[action.type](action, dispatch, getState);
		}
		return ReduceResult.STORE;
	}

}
