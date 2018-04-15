import {Dispatch as ReduxDispatch, Middleware as ReduxMiddleware, MiddlewareAPI} from "redux";
import {Action, Dispatch} from "./Action";

export {Action, Dispatch};

export class ReduceResult {
	public static BREAK = new ReduceResult();
	public static DONT_STORE = new ReduceResult();
	public static STORE = new ReduceResult();
}

/** handle action, return true if dispatch chain should be broken */
export type Handler<S> = (action: Action, dispatch: Dispatch, getState: () => S) => ReduceResult;

export interface HandlerMap<S> {
	[actionType: string]: Handler<S>;
}

export interface Middleware<S> {
	reduce(action: Action, dispatch: Dispatch, getState: () => S): ReduceResult;
}

export function aggregateMiddlewares<S>(...middlewares: Array<Middleware<S>>): ReduxMiddleware {
	const reduce = (action: Action, dispatch: Dispatch, getState: () => S | any): boolean => {
		let store = true;
		for (const m of middlewares) {
			const result = m.reduce(action, dispatch, getState);
			if (ReduceResult.BREAK === result) return false;
			store = store && (!(result === ReduceResult.DONT_STORE));
		}
		return store;
	};

	return <IS>(api: MiddlewareAPI<IS>) => {
		return (next: ReduxDispatch<IS>) => {
			return (action) => {
				if (reduce(action, api.dispatch, api.getState)) {
					next(action);
				}
				return action;
			};
		};
	};
}
