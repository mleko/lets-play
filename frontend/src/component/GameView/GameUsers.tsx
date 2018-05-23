import * as React from "react";
import {ChangeEvent} from "react";

import {FormControl, InputAdornment, InputLabel} from "material-ui";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import Input from "material-ui/Input";

export interface GameUsersProps {
	onInvite?: (email: string) => any;
}

export class GameUsers extends React.PureComponent<GameUsersProps, State> {

	public constructor(props: GameUsersProps) {
		super(props);
		this.state = {
			email: "",
			emailError: false
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				GameUsers
				<div>
					<Divider/>
					<h3>Zaproszenia</h3>
					<FormControl fullWidth={true}>
						<InputLabel htmlFor="adornment-email">Email</InputLabel>
						<Input
							error={this.state.emailError}
							id="adornment-email"
							type={"email"}
							startAdornment={<InputAdornment position="start">@</InputAdornment>}
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
						Zaproś
					</Button>

				</div>
			</div>
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

	private invite = () => {
		const testResult = emailTest.test(this.state.email);
		if (!testResult) {
			this.setState({emailError: true});
			return;
		} else {
			this.setState({emailError: false});
		}

		if (this.props.onInvite) {
			this.props.onInvite(this.state.email);
		}
		this.setState({email: ""});
	}
}

const emailTest = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

interface State {
	email: string;
	emailError: boolean;
}
