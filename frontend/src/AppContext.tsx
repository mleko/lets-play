import * as React from "react";

import {Provider as StoreProvider} from "react-redux";
import {applyMiddleware, compose, createStore, StoreCreator} from "redux";

import {AxiosHttpClient} from "./infrastructure/http/implementation/AxiosHttpClient";
import {HttpClientProvider} from "./infrastructure/http/Provider";

import {Application} from "./container/Application";
import {appReducer, initialAppState} from "./redux";
import {aggregateMiddlewares} from "./redux/Middleware";
import {AuthMiddleware} from "./redux/module/auth/AuthMiddleware";

const httpClient = new AxiosHttpClient({}, {baseUrl: "/api"});

const devTools = window["devToolsExtension"] && process.env["NODE_ENV"] !== "production" ? window["devToolsExtension"]() : undefined;
let localCreateStore: StoreCreator = createStore;
localCreateStore = compose(applyMiddleware(aggregateMiddlewares(
	new AuthMiddleware(httpClient)
)))(localCreateStore);
const store = localCreateStore(appReducer, initialAppState, devTools);

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
