import * as React from "react";

import {Avatar, Menu, MenuItem} from "material-ui";
import {LinkButton} from "./LinkButton";

export interface AuthenticationBadgeProps {
	authenticated: boolean;

	onLogout: () => any;
}

export class AuthenticationBadge extends React.PureComponent<AuthenticationBadgeProps, State> {

	public constructor(props: AuthenticationBadgeProps) {
		super(props);
		this.state = {
			anchorElement: null
		};
	}

	public render(): JSX.Element {
		if (!this.props.authenticated) {
			return (
				<LinkButton color="inherit" to="/login">Login</LinkButton>
			);
		}
		return (
			<div>
				<Avatar style={{cursor: "pointer"}} onClick={this.openMenu}>M</Avatar>
				<Menu open={null !== this.state.anchorElement} anchorEl={this.state.anchorElement} onClose={this.closeMenu}>
					{/*<MenuItem>Profil</MenuItem>*/}
					{/*<Divider/>*/}
					<MenuItem onClick={this.logOut}>Wyloguj</MenuItem>
				</Menu>
			</div>
		);
	}

	private openMenu = (event: React.SyntheticEvent<any>) => {
		this.setState({anchorElement: event.currentTarget});
	};
	private closeMenu = () => {
		this.setState({anchorElement: null});
	};
	private logOut = () => {
		this.setState({anchorElement: null});
		this.props.onLogout();
	}
}

interface State {
	anchorElement?: any;
}
