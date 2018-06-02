import * as React from "react";
import {Provider as StoreProvider} from "react-redux";

import {Application} from "./container/Application";
import {httpClient, store} from "./context";
import {HttpClientProvider} from "./infrastructure/http/Provider";
import {AuthActions} from "./redux/module/auth";

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

	public componentWillMount(): void {
		store.dispatch(AuthActions.check());
	}
}
