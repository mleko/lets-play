import * as React from "react";

import {CircularProgress, Paper, Reboot} from "material-ui";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import {HashRouter as Router} from "react-router-dom";

import {MainMenu} from "./component/MainMenu";
import {PrivateRoute} from "./component/PrivateRoute";
import {TopBar} from "./component/TopBar";
import {GameList} from "./container/GameList";
import {GameView} from "./container/GameView";
import {Invitation} from "./container/Invitation";
import {LoginScreen} from "./container/LoginScreen";
import {MatchSetList} from "./container/MatchSetList";
import {MatchSetView} from "./container/MatchSetView";

export interface ApplicationProps {
	authenticated?: boolean;
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
		const authed = this.props.authenticated;
		if (null === authed) {
			const loadingStyle: React.CSSProperties = {
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				position: "absolute",
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				backgroundColor: "#fafafa"
			};
			return (
				<div style={loadingStyle}>
					<CircularProgress size={150}/>
				</div>
			);
		}
		return (
			<div>
				<Reboot/>
				<Router>
					<div>
						<TopBar
							authenticated={authed}
							onMenuOpen={this.openMenu}
							onLogout={this.props.onLogout}
						/>
						{this.renderMenu()}
						<div style={{maxWidth: 900, flex: 1, margin: "auto", paddingTop: 40}}>
							<Paper style={{padding: 12}}>
								<Switch>
									<Route path="/login" render={this.renderLoginScreen}/>
									<PrivateRoute
										authenticated={authed}
										path="/match-sets/new"
										render={this.renderMatchSetView}
									/>
									<PrivateRoute
										authenticated={authed}
										path="/match-sets/:setId"
										render={this.renderMatchSetView}
									/>
									<PrivateRoute
										authenticated={authed}
										path="/match-sets"
										render={this.renderMatchSetList}
									/>
									<PrivateRoute authenticated={authed} path={"/"} exact={true} render={this.renderGameList}/>
									<PrivateRoute
										authenticated={authed}
										path="/game/:gameId"
										render={this.renderGameView}
									/>
									<Route path="/invitation/:invitationId" render={this.renderInvitation}/>
									<Route render={this.renderDefaultRoute}/>
								</Switch>
							</Paper>
						</div>
					</div>
				</Router>
			</div>
		);
	}

	private renderMenu() {
		if (!this.props.authenticated) {
			return null;
		}
		return (
			<MainMenu open={this.state.menuOpen} onMenuClose={this.closeMenu}/>
		);
	}

	private renderLoginScreen = () => {
		if(this.props.authenticated){
			return (<Redirect to={"/"}/>);
		}
		return (<LoginScreen/>);
	};

	private renderGameView = (p: RouteComponentProps<any>) => {
		return (
			<GameView
				gameId={p.match.params.gameId}
			/>
		);
	};
	private renderGameList = (p: RouteComponentProps<any>) => {
		return (<GameList/>);
	};

	private renderMatchSetView = (p: RouteComponentProps<any>) => {
		return (
			<MatchSetView setId={p.match.params.setId}/>
		);
	};

	private renderMatchSetList = () => {
		return <MatchSetList/>;
	};
	private renderInvitation = (p: RouteComponentProps<any>) => {
		return (<Invitation invitationId={p.match.params.invitationId}/>);
	};

	private renderDefaultRoute = () => {
		if (this.props.authenticated) {
			return <Redirect to={"/"}/>;
		} else {
			return <div>Redirect<Redirect to={"/login"}/></div>;
		}
	};

	private openMenu = () => {
		this.setState({menuOpen: true});
	};
	private closeMenu = () => {
		this.setState({menuOpen: false});
	};
}

interface AppState {
	menuOpen: boolean;
}
