import * as React from "react";
import {I18nextProvider} from "react-i18next";
import {Provider as StoreProvider} from "react-redux";

import {Application} from "./container/Application";
import {httpClient, i18n, store} from "./context";
import {HttpClientProvider} from "./infrastructure/http/Provider";
import {AuthActions} from "./redux/module/auth";

export class AppContext extends React.PureComponent<{}, {}> {
	public render(): JSX.Element {
		return (
			<HttpClientProvider httpClient={httpClient}>
				<StoreProvider store={store}>
					<I18nextProvider i18n={i18n}>
						<Application/>
					</I18nextProvider>
				</StoreProvider>
			</HttpClientProvider>
		);
	}

	public componentWillMount(): void {
		store.dispatch(AuthActions.check());
	}
}
