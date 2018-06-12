import * as React from "react";

import {Avatar, Menu, MenuItem} from "material-ui";
import Divider from "material-ui/Divider";
import {Trans} from "react-i18next";
import {User} from "../model/models";
import {LinkButton} from "./LinkButton";

export interface AuthenticationBadgeProps {
	authenticated: boolean;
	user: User;

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
				<LinkButton color="inherit" to="/login"><Trans>Log in</Trans></LinkButton>
			);
		}
		return (
			<div>
				<Avatar
					style={{cursor: "pointer"}}
					onClick={this.openMenu}
				>
					{this.props.user.name.substring(0, 1)}
				</Avatar>
				<Menu
					open={null !== this.state.anchorElement}
					anchorEl={this.state.anchorElement}
					onClose={this.closeMenu}
				>
					<MenuItem disabled={true}>{this.props.user.name}</MenuItem>
					<Divider/>
					<MenuItem onClick={this.logOut}><Trans>Log out</Trans></MenuItem>
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
