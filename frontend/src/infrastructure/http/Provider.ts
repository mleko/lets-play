import {Children, Component, ValidationMap} from "react";

import {object} from "prop-types";

import {Client} from "./Client";
export {Client};

export interface ProviderProps {
	httpClient: Client;
}

export interface HttpClientContext {
	httpClient: Client;
}

export const httpContextValidationMap: ValidationMap<any> = {
	httpClient: object.isRequired
};

export class HttpClientProvider extends Component<ProviderProps, {}> {
	public static childContextTypes = httpContextValidationMap;

	public getChildContext(): HttpClientContext {
		return {
			httpClient: this.props.httpClient
		};
	}

	public render(): JSX.Element {
		return Children.only(this.props.children);
	}
}
