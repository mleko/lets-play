import * as React from "react";

import InfoIcon from "material-ui-icons/Info";
import Button from "material-ui/Button";
import FormControl from "material-ui/Form/FormControl";
import InputAdornment from "material-ui/Input/InputAdornment";
import TextField from "material-ui/TextField";
import {Trans} from "react-i18next";
import {RodoDialog} from "./RodoDialog";

export interface RegisterFormProps {
	onRegister: (name: string, email: string, password: string) => any;
}

export class RegisterForm extends React.PureComponent<RegisterFormProps, State> {

	public constructor(props: RegisterFormProps) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			showRodoDialog: false
		};
	}

	public render(): JSX.Element {

		const inputProps = {
			endAdornment: (
				<InputAdornment position="end">
					<InfoIcon
						color={"disabled"}
						onClick={this.showRodoDialog}
					/>
				</InputAdornment>
			)
		};
		return (
			<div>
				<RodoDialog open={this.state.showRodoDialog} onClose={this.hideRodoDialog}/>
				<form>
					<FormControl>
						<TextField
							label={<Trans>Username</Trans>}
							name="name"
							style={{marginTop: 50}}
							value={this.state.name}
							error={!!this.state.nameError}
							helperText={this.state.nameError}
							onChange={this.updateName}
						/>
						<TextField
							label="Email"
							name="email"
							type="email"
							value={this.state.email}
							error={!!this.state.emailError}
							helperText={this.state.emailError}
							InputProps={inputProps}
							onChange={this.updateEmail}
						/>
						<TextField
							label={<Trans>Password</Trans>}
							type="password"
							name="password"
							value={this.state.password}
							error={!!this.state.passwordError}
							helperText={<Trans>{this.state.passwordError}</Trans>}
							onChange={this.updatePassword}
						/>
						<Button
							color="primary"
							variant="raised"
							style={{margin: 20}}
							onClick={this.register}
						>
							<Trans>Register</Trans>
						</Button>
					</FormControl>
				</form>
			</div>
		);
	}

	private validate = (): boolean => {
		let error = false;
		const errors: Errors = {nameError: null, emailError: null, passwordError: null};
		if (0 === this.state.name.length) {
			errors.nameError = "Name cannot be empty";
			error = true;
		}
		if (0 === this.state.email.length) {
			errors.emailError = "Email cannot be empty";
			error = true;
		} else if (!this.state.email.match("\\S+@\\S+\\.\\S+")) {
			errors.emailError = "Email must be valid email address";
			error = true;
		}
		if (this.state.password.length < 7) {
			errors.passwordError = "Password must at least 7 characters long";
			error = true;
		}

		this.setState(errors);
		return !error;
	};

	private updateName = (event: React.SyntheticEvent<HTMLInputElement>) => {
		this.setState({name: event.currentTarget.value});
	};
	private updateEmail = (event: React.SyntheticEvent<HTMLInputElement>) => {
		this.setState({email: event.currentTarget.value});
	};
	private updatePassword = (event: React.SyntheticEvent<HTMLInputElement>) => {
		this.setState({password: event.currentTarget.value});
	};

	private register = () => {
		if (this.validate()) {
			this.props.onRegister(this.state.name, this.state.email, this.state.password);
		}
	};

	private showRodoDialog = () => {
		this.setState({showRodoDialog: true});
	};
	private hideRodoDialog = () => {
		this.setState({showRodoDialog: false});
	};
}

interface State extends Errors {
	name: string;
	email: string;
	password: string;
	showRodoDialog: boolean;
}

interface Errors {
	nameError?: string;
	emailError?: string;
	passwordError?: string;
}
