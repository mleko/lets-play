import * as React from "react";

import {Provider as StoreProvider} from "react-redux";
import {createStore} from "redux";

import {AxiosHttpClient} from "./infrastructure/http/implementation/AxiosHttpClient";
import {HttpClientProvider} from "./infrastructure/http/Provider";

import {Application} from "./Application";

const httpClient = new AxiosHttpClient();

const devTools = window["devToolsExtension"] && process.env["NODE_ENV"] !== "production" ? window["devToolsExtension"]() : undefined;
const store = createStore((s) => s, undefined, devTools);

export class AppContext extends React.PureComponent<{}, {}> {
	public render(): JSX.Element {
		return (
			<HttpClientProvider httpClient={httpClient}>
				<StoreProvider store={store}>
					<Application/>
				</StoreProvider>
			</HttpClientProvider>
		);
	}
}
