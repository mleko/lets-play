export function reducerFactory<T>(actionHandlers, defaultState: T) {
	return (state: T = defaultState, action): T => {
		if (actionHandlers.hasOwnProperty(action.type)) {
			return actionHandlers[action.type](state, action);
		}
		return state;
	};
}
