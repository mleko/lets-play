import * as React from "react";

import { Button, Divider, FormControl, TextField, Typography } from "material-ui";

export interface RegisterFormProps {
	onRegister: (name: string, email: string, password: string) => any;
}

export class RegisterForm extends React.PureComponent<RegisterFormProps, State> {
	public render(): JSX.Element {
		return (
			<form>
					<FormControl>
						<TextField label="Name" name="name" style={{marginTop: 50}}/>
						<TextField label="Email" name="email" type="email"/>
						<TextField label="Password" type="password" name="password"/>
						<Button
							color="primary"
							variant="raised"
							style={{margin: 20}}
							onClick={this.register}
						>
							Register
						</Button>
					</FormControl>
				</form>
		);
	}

	private register = () => {
		this.props.onRegister(this.state.name, this.state.email, this.state.password);
	}
}

interface State {
	name: string;
	email: string;
	password: string;
}
