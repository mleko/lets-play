import * as React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Redirect} from "react-router";
import {GameInvitation} from "../model/models";

export interface InvitationProps {
	invitation: GameInvitation;
	accepted: boolean;
	notFound: boolean;
	onAccept: (invitationId: string) => any;
	onReject: (invitationId: string) => any;
}

export class Invitation extends React.PureComponent<InvitationProps, {}> {
	public render(): JSX.Element {
		if (this.props.notFound) {
			return (
				<Grid container={true} spacing={24}>
					<Grid xs={12} item={true}>
						<h2 style={{textAlign: "center"}}>Zaproszenie wygasło bądź zostało już użyte</h2>
					</Grid>
				</Grid>
			);
		}
		if (!this.props.invitation) {
			return null;
		}
		if (this.props.accepted) {
			return (
				<Redirect to={"/games/" + this.props.invitation.game.id}/>
			);
		}
		return (
			<Grid container={true} spacing={24}>
				<Grid xs={12} item={true}>
					<h2 style={{textAlign: "center"}}>Zaproszenie do gry</h2>
				</Grid>
				<Grid xs={12} item={true}>
					<h3 style={{textAlign: "center"}}>{this.props.invitation.game.name}</h3>
				</Grid>
				<Grid xs={6} item={true}>
					<Button
						color={"secondary"}
						variant={"raised"}
						fullWidth={true}
						onClick={this.reject}
					>
						Odrzuć
					</Button>
				</Grid>
				<Grid xs={6} item={true}>
					<Button
						color={"primary"}
						variant={"raised"}
						fullWidth={true}
						onClick={this.accept}
					>
						Akceptuj
					</Button>
				</Grid>
			</Grid>
		);
	}

	private accept = () => {
		this.props.onAccept(this.props.invitation.id);
	};
	private reject = () => {
		this.props.onReject(this.props.invitation.id);
	};
}
