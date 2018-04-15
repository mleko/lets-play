import {Action} from "./Action";

export interface ActionHandlerMap<T> {
	[id: string]: (state: T, action: Action) => T;
}

export function reducerFactory<T>(actionHandlers: ActionHandlerMap<T>, defaultState: T) {
	return (state: T = defaultState, action: Action): T => {
		if (actionHandlers.hasOwnProperty(action.type)) {
			return actionHandlers[action.type](state, action);
		}
		return state;
	};
}
