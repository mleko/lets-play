import * as React from "react";

import {ListItem} from "material-ui";
import List from "material-ui/List";
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

	private renderUser = (user: User) => {
		return (
			<ListItem>
				{user.name}
			</ListItem>
		);
	}
}
