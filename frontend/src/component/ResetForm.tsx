import * as React from "react";

import {FormControl} from "material-ui";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

export interface LoginProps {
	token: string;
	onReset: (token: string, password: string) => any;
}

export class ResetForm extends React.PureComponent<LoginProps, State> {

	public constructor(props: LoginProps) {
		super(props);
		this.state = {
			password: ""
		};
	}

	public render(): JSX.Element {
		return (
			<div style={{textAlign: "center"}}>
				<AppBar position="static">
					<Toolbar>
						<Typography variant="title" color="inherit">
					Reset hasła
						</Typography>
					</Toolbar>
				</AppBar>
				<form>
					<FormControl style={{marginTop: 10}}>
						<TextField
							label="Password"
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
							Reset
						</Button>
					</FormControl>
				</form>
			</div>
		);
	}

	private validate = (): boolean => {
		let error = false;
		const errors: Errors = {passwordError: null};
		if (this.state.password.length < 6) {
			errors.passwordError = "Password must at least 7 characters long";
			error = true;
		}

		this.setState(errors);
		return !error;
	};

	private updatePassword = (event: React.SyntheticEvent<HTMLInputElement>) => {
		this.setState({password: event.currentTarget.value});
	};

	private register = () => {
		if (this.validate()) {
			this.props.onReset(this.props.token, this.state.password);
		}
	}
}

interface State extends Errors {
	password: string;
}

interface Errors {
	passwordError?: string;
}
