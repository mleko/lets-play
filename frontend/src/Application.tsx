import * as React from "react";

import {Paper, Reboot} from "material-ui";
import {Route, RouteComponentProps, Switch} from "react-router";
import {HashRouter as Router} from "react-router-dom";

import {GameView} from "./component/GameView";
import {MainMenu} from "./component/MainMenu";
import {MatchSetList} from "./component/MatchSetList";
import {MatchSetView} from "./component/MatchSetView";
import {TopBar} from "./component/TopBar";
import {LoginScreen} from "./container/LoginScreen";

export interface ApplicationProps {
	authenticated: boolean;
}

export interface ApplicationActions {
	onLogout: () => any;
}

export class Application extends React.Component<ApplicationProps & ApplicationActions, AppState> {

	public constructor(props: any) {
		super(props);
		this.state = {
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
							authenticated={this.props.authenticated}
							onMenuOpen={this.openMenu}
							onLogout={this.props.onLogout}
						/>
						<MainMenu open={this.state.menuOpen} onMenuClose={this.closeMenu}/>
						<div style={{maxWidth: 900, flex: 1, margin: "auto", paddingTop: 40}}>
							<Paper style={{padding: 12}}>
								<Route path="/login" render={this.renderLoginScreen}/>
								<Switch>
									<Route path="/match-sets/new" component={MatchSetView}/>
									<Route path="/match-sets/:setId" render={this.renderMatchSetView}/>
									<Route path="/match-sets" component={MatchSetList}/>
								</Switch>
								<Route path="/game/:gameId" render={this.renderGameView}/>
							</Paper>
						</div>
					</div>
				</Router>
			</div>
		);
	}

	private renderLoginScreen = () => {
		return (<LoginScreen/>);
	};

	private renderGameView = (p: RouteComponentProps<any>) => {
		return (
			<GameView
				gameId={p.match.params.gameId}
			/>
		);
	};

	private renderMatchSetView = (p: RouteComponentProps<any>) => {
		return null;
	};

	private openMenu = () => {
		this.setState({menuOpen: true});
	};
	private closeMenu = () => {
		this.setState({menuOpen: false});
	};
	private anyH = (a?: string, b?: string, c?: string) => {
		// do nothing
	};
}

interface AppState {
	menuOpen: boolean;
}
