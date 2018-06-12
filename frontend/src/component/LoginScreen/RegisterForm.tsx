import * as React from "react";

import {Button, FormControl, TextField} from "material-ui";
import {Trans} from "react-i18next";

export interface RegisterFormProps {
	onRegister: (name: string, email: string, password: string) => any;
}

export class RegisterForm extends React.PureComponent<RegisterFormProps, State> {

	public constructor(props: RegisterFormProps) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: ""
		};
	}

	public render(): JSX.Element {
		return (
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
						onChange={this.updateEmail}
					/>
					<TextField
						label={<Trans>Password</Trans>}
						type="password"
						name="password"
						value={this.state.password}
						error={!!this.state.passwordError}
						helperText={this.state.passwordError}
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
	}
}

interface State extends Errors {
	name: string;
	email: string;
	password: string;
}

interface Errors {
	nameError?: string;
	emailError?: string;
	passwordError?: string;
}
