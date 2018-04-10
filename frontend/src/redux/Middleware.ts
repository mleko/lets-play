import {Dispatch as ReduxDispatch, Middleware as ReduxMiddleware, MiddlewareAPI} from "redux";
import {Action, Dispatch} from "./Action";

export {Action, Dispatch};

export type ReduceResultType = ReduceResult;

export class ReduceResult {
	public static BREAK = new ReduceResult("BREAK");
	public static DONT_STORE = new ReduceResult("DONT_STORE");
	public static STORE = new ReduceResult("STORE");

	private constructor(private value: any) {
	}
}

/** handle action, return true if dispatch chain should be broken */
export type Handler<S> = (action: Action, dispatch: Dispatch, getState: () => S) => ReduceResultType;

export interface HandlerMap<S> {
	[actionType: string]: Handler<S>;
}

export interface Middleware<S> {
	reduce(action: Action, dispatch: Dispatch, getState: () => S): ReduceResultType;
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
		return <A>(next: ReduxDispatch<IS>) => {
			return (action) => {
				if (reduce(action, api.dispatch, api.getState)) {
					next(action);
				}
				return action;
			};
		};
	};
}
