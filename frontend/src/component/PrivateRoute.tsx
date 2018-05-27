import * as React from "react";
import {Redirect, Route, RouteComponentProps} from "react-router";

export interface PrivateRouteProps {
	path: string;
	render: ((props: RouteComponentProps<any>) => React.ReactNode);
	authenticated: boolean;
}

export class PrivateRoute extends React.PureComponent<PrivateRouteProps, {}> {
	public render(): JSX.Element {
		if (!this.props.authenticated) {
			return (
				<Redirect to={"/login"}/>
			);
		}
		return (
			<Route path={this.props.path} render={this.props.render}/>
		);
	}
}
