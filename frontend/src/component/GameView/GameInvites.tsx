import * as React from "react";
import {ChangeEvent} from "react";

import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import FormControl from "material-ui/Form/FormControl";
import Input from "material-ui/Input";
import InputLabel from "material-ui/Input/InputLabel";
import {Theme} from "material-ui/styles";
import withStyles from "material-ui/styles/withStyles";
import {Trans} from "react-i18next";
import {GameInvite} from "../../model/models";

export interface GameInvitesProps {
	invitation: GameInvite;
	onInvite: (email: null | string, permanent: boolean) => any;
}

export class GameInvites extends React.PureComponent<GameInvitesProps, State> {

	public constructor(props: GameInvitesProps) {
		super(props);
		this.state = {
			emailError: false,
			email: ""
		};
	}

	public render(): JSX.Element {
		return (
			<div style={{width: "100%"}}>
				<Button
					variant={"raised"}
					fullWidth={true}
					color={"primary"}
					style={{marginTop: 6}}
					onClick={this.createInvitation}
				>
					<Trans>Create single-use invitation</Trans>
				</Button>
				<Button
					variant={"raised"}
					fullWidth={true}
					color={"primary"}
					style={{marginTop: 6}}
					onClick={this.createPermanentInvitation}
				>
					<Trans>Create reusable invitation</Trans>
				</Button>
				{this.renderInvitation()}
				<Divider style={{marginTop: 6, marginBottom: 6}}/>
				<FormControl fullWidth={true}>
					<InputLabel htmlFor="adornment-email">Email</InputLabel>
					<Input
						error={this.state.emailError}
						id="adornment-email"
						type={"email"}
						value={this.state.email}
						onChange={this.updateEmail}
						onKeyDown={this.inputKeyDown}
					/>
				</FormControl>
				<Button
					variant={"raised"}
					fullWidth={true}
					color={"primary"}
					style={{marginTop: 4}}
					onClick={this.invite}
				>
					<Trans>Send invitation</Trans>
				</Button>
			</div>
		);
	}

	private renderInvitation() {
		if (!this.props.invitation) {
			return null;
		}
		const invitation = location.origin + "/#/invitation/" + this.props.invitation.id;
		return (
			<InvitationUrl text={invitation}/>
		);
	}

	private updateEmail = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			email: event.target.value,
			emailError: this.state.emailError && !emailTest.test(event.target.value)
		});
	};

	private inputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" && this.state.email.trim().length > 0) {
			this.invite();
		}
	};

	private createInvitation = () => {
		this.props.onInvite(null, false);
	};

	private createPermanentInvitation = () => {
		this.props.onInvite(null, true);
	};

	private invite = () => {
		const testResult = emailTest.test(this.state.email);
		if (!testResult) {
			this.setState({emailError: true});
			return;
		} else {
			this.setState({emailError: false});
		}

		if (this.props.onInvite) {
			this.props.onInvite(this.state.email, false);
		}
		this.setState({email: ""});
	}

}

const emailTest = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

interface State {
	email: string;
	emailError: boolean;
}

const styles = (theme: Theme) => ({
	root: {
		...theme.typography.button,
		backgroundColor: "#DCEDC8",
		padding: theme.spacing.unit,
		textTransform: "none",
		textAlign: "center",
		marginTop: 3
	},
});

function Url(props: { classes?: any, text: string }) {
	return <div className={props.classes.root}>{props.text}</div>;
}

const InvitationUrl = withStyles(styles)(Url);
