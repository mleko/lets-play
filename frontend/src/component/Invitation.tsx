import * as React from "react";

import Button from "material-ui/Button";
import Grid from "material-ui/Grid";

export interface InvitationProps {
	invitationId: string;
}

export class Invitation extends React.PureComponent<InvitationProps, {}> {
	public render(): JSX.Element {
		return (
			<Grid container={true} spacing={24}>
				<Grid xs={12}>
					<h2 style={{textAlign: "center"}}>Zaproszenie do gry</h2>
				</Grid>
				<Grid xs={12}>
					<h3 style={{textAlign: "center"}}>Instac ble bla</h3>
				</Grid>
				<Grid xs={6}>
					<Button color={"secondary"} variant={"raised"} fullWidth={true}>Odrzuć</Button>
				</Grid>
				<Grid xs={6}>
					<Button color={"primary"} variant={"raised"} fullWidth={true}>Akceptuj</Button>
				</Grid>
			</Grid>
		);
	}
}
