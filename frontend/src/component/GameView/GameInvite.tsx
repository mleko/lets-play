import * as React from "react";

import {ListItem, ListItemSecondaryAction, ListItemText} from "material-ui";
import {Delete as DeleteIcon, Message as MessageIcon} from "material-ui-icons";
import IconButton from "material-ui/IconButton";

export interface GameInviteProps {
	email: string;
	onCancel: (email: string) => any;
}

export class GameInvite extends React.PureComponent<GameInviteProps, {}> {
	public render(): JSX.Element {
		return (
			<ListItem
				divider={true}
			>
				<ListItemText primary={this.props.email}/>
				<ListItemSecondaryAction>
					<IconButton aria-label={"Resend invite"}>
						<MessageIcon/>
					</IconButton>
					<IconButton
						aria-label={"Cancel invite"}
						onClick={this.cancelInvite}
					>
						<DeleteIcon/>
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		);
	}

	private cancelInvite = () => {
		this.props.onCancel(this.props.email);
	}
}
