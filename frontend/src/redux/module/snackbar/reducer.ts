import {shallowMerge} from "typescript-object-utils";
import {reducerFactory} from "../../ReducerFactory";
import {Message, snackbarActions} from "./index";

export interface SnackbarState {
	show: boolean;
	message: string | null;
	queue: string[];
}

export const initialSnackbarState: SnackbarState = {show: false, message: null, queue: []};

const processState = (state: SnackbarState): SnackbarState => {
	if (state.queue.length > 0) {
		return {
			show: true,
			message: state.queue[0],
			queue: state.queue.slice(1)
		};
	}
	return state;
};

const handlers = {
	[snackbarActions.message]: (state: SnackbarState, action: Message): SnackbarState => {
		state = shallowMerge(state, {queue: state.queue.concat([action.payload.message])});
		if (state.show) {
			return shallowMerge(state, {show: false});
		} else {
			return processState(state);
		}
	},
	[snackbarActions.exited]: (state: SnackbarState): SnackbarState => {
		return processState(state);
	},
	[snackbarActions.close]: (state: SnackbarState): SnackbarState => {
		return shallowMerge(state, {show: false});
	}
};

export const snackbarReducer = reducerFactory(handlers, initialSnackbarState);
