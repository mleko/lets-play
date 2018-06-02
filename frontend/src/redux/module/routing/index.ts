import {StandardAction} from "../../Action";

export const routingActions = {
	redirect: "routing/Redirect",
};

export class RoutingActions {
	public static redirect(url: string): Redirect {
		return {
			type: routingActions.redirect,
			payload: {url}
		};
	}
}

export type Redirect = StandardAction<{ url: string }>;
