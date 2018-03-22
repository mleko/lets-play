import {Action as ReduxAction, Store as ReduxStore} from "redux";

export interface Action extends ReduxAction {
	type: string;

	[key: string]: any;
}

export interface StandardAction<T> extends Action {
	payload: T;
	error?: boolean;
	meta?: any;

	[key: string]: any;
}

export interface Dispatch {
	(action: Action): any;
}

export interface Store<S> extends ReduxStore<S> {
	dispatch: Dispatch;
}
