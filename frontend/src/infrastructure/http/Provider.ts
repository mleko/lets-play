import {Children, Component, ValidationMap} from "react";

import {PropTypes} from "prop-types";

import {Client} from "./Client";
export {Client};

export interface ProviderProps {
	httpClient: Client;
}

export interface HttpClientContext {
	httpClient: Client;
}

const ProviderContextValidationMap: ValidationMap<any> = {
	httpClient: PropTypes.object.isRequired
};

export class HttpClientProvider extends Component<ProviderProps, {}> {
	public static childContextTypes = ProviderContextValidationMap;

	public getChildContext(): HttpClientContext {
		return {
			httpClient: this.props.httpClient
		};
	}

	public render(): JSX.Element {
		return Children.only(this.props.children);
	}
}
