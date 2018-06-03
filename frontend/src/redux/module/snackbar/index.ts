import {StandardAction} from "../../Action";

export const snackbarActions = {
	message: "snackbar/Message",
	close: "snackbar/Close",
	exited: "snackbar/Exited"
};

export class SnackbarActions {
	public static message(message: string): Message {
		return {
			type: snackbarActions.message,
			payload: {message}
		};
	}

	public static close(reason: string): Close {
		return {
			type: snackbarActions.close,
			payload: {reason}
		};
	}

	public static exited(): StandardAction<void> {
		return {
			type: snackbarActions.exited,
			payload: undefined
		};
	}
}

export type Message = StandardAction<{ message: string }>;
export type Close = StandardAction<{ reason: string }>;
