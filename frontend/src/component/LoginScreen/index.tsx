import * as React from "react";

import {AppBar, Tab, Tabs} from "material-ui";
import {Trans} from "react-i18next";

import {LoginForm} from "./LoginForm";
import {RegisterForm} from "./RegisterForm";

export interface LoginProps {
	onLogin: (email: string, password: string) => any;
	onReset: (email: string) => any;
	onRegister: (name: string, email: string, password: string) => any;
}

export class LoginScreen extends React.PureComponent<LoginProps, State> {

	public constructor(props: LoginProps) {
		super(props);
		this.state = {
			selectedTab: 0
		};
	}

	public render(): JSX.Element {
		return (
			<div style={{textAlign: "center"}}>
				<AppBar position="static">
					<Tabs value={this.state.selectedTab} onChange={this.changeTab}>
						<Tab label={<Trans>Log in</Trans>}/>
						<Tab label={<Trans>Register</Trans>}/>
					</Tabs>
				</AppBar>
				{this.renderTabContent()}
			</div>
		);
	}

	private renderTabContent() {
		if (1 === this.state.selectedTab) {
			return (
				<RegisterForm
					onRegister={this.props.onRegister}
				/>
			);
		}
		return (
			<LoginForm
				onLogin={this.props.onLogin}
				onReset={this.props.onReset}
			/>
		);
	}

	private changeTab = (event: any, value: number) => {
		this.setState({selectedTab: value});
	}
}

interface State {
	selectedTab: number;
}
