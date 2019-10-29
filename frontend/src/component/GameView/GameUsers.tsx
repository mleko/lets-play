import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {User} from "../../model/models";

export interface GameUsersProps {
	users: User[];
}

export class GameUsers extends React.PureComponent<GameUsersProps, {}> {
	public render(): JSX.Element {
		return (
			<List>
				{this.props.users.map(this.renderUser)}
			</List>
		);
	}

	private renderUser = (user: User, index: number) => {
		return (
			<ListItem key={index}>
				{user.name}
			</ListItem>
		);
	}
}
