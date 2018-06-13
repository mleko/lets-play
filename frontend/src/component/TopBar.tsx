import * as React from "react";

import MenuIcon from "material-ui-icons/Menu";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import {User} from "../model/models";
import {AuthenticationBadge} from "./AuthenticationBadge";
import {Link} from "./Link";

export interface TopBarProps {
	authenticated: boolean;
	user?: User;
	onLogout: () => any;
	onMenuOpen: () => any;
}

export class TopBar extends React.PureComponent<TopBarProps, {}> {
	public render(): JSX.Element {
		return (
			<AppBar position="static" color="default">
				<Toolbar>
					{this.renderMenuIcon()}
					<Typography style={{marginRight: 8, flex: 1}} variant="title" color="inherit">
						<Link to={this.props.authenticated ? "/" : "/login"}>
							Lets Play
						</Link>
					</Typography>
					<AuthenticationBadge user={this.props.user} authenticated={this.props.authenticated} onLogout={this.props.onLogout}/>
				</Toolbar>
			</AppBar>
		);
	}

	private renderMenuIcon() {
		if (!this.props.authenticated) {
			return null;
		}
		return (
			<IconButton color="inherit" aria-label="Menu" onClick={this.props.onMenuOpen}>
				<MenuIcon/>
			</IconButton>
		);
	}
}
