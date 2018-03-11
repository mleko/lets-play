import * as React from "react";

import {Paper, Reboot} from "material-ui";
import {match, Route, RouteComponentProps} from "react-router";
import {HashRouter as Router} from "react-router-dom";

import {GameView} from "./component/GameView";
import {MainMenu} from "./component/MainMenu";
import {MatchSetList} from "./component/MatchSetList";
import {TopBar} from "./component/TopBar";
import {LoginScreen} from "./container/LoginScreen";

export class Application extends React.Component<{}, AppState> {

	public constructor(props: any) {
		super(props);
		this.state = {
			authenticated: false,
			menuOpen: false
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<Reboot/>
				<Router>
					<div>
						<TopBar
							authenticated={this.state.authenticated}
							onMenuOpen={this.openMenu}
							onLogout={this.logout}
						/>
						<MainMenu open={this.state.menuOpen} onMenuClose={this.closeMenu}/>
						<div style={{maxWidth: 900, flex: 1, margin: "auto", paddingTop: 40}}>
							<Paper style={{padding: 12}}>
								<Route path="/login" render={this.renderLoginScreen}/>
								<Route path="/match-sets" component={MatchSetList}/>
								<Route path="/game/:gameId" render={this.renderGameView}/>
							</Paper>
						</div>
					</div>
				</Router>
			</div>
		);
	}

	private renderLoginScreen = () => {
		return (
			<LoginScreen
			/>
		);
	};

	private renderGameView = (p: RouteComponentProps<any>) => {
		return (
			<GameView
				gameId={p.match.params.gameId}
			/>
		);
	};

	private openMenu = () => {
		this.setState({menuOpen: true});
	};
	private closeMenu = () => {
		this.setState({menuOpen: false});
	};
	private logout = () => {
		this.setState({authenticated: false});
	};
	private logIn = (email: string, password: string) => {
		this.setState({authenticated: true});
	};
	private anyH = (a?: string, b?: string, c?: string) => {
		// do nothing
	};
}

interface AppState {
	authenticated: boolean;
	menuOpen: boolean;
}
