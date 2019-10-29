import * as React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Trans} from "react-i18next";

export interface RodoDialogProps {
	open: boolean;
	onClose: () => any;
}

export class RodoDialog extends React.PureComponent<RodoDialogProps, {}> {
	public render(): JSX.Element {
		return (
			<Dialog onClose={this.props.onClose} open={this.props.open}>
				<DialogTitle>Email info</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<div><Trans>We use email only as login and for the purpose of password reset</Trans>.</div>
						<div>
							<Trans>You may provide fake email but you will not be able to reset password if you forget it</Trans>.
						</div>
						<div><Trans>We store email in hashed form</Trans>.</div>
						<a href="https://en.wikipedia.org/wiki/Hash_function">https://en.wikipedia.org/wiki/Hash_function</a>
					</DialogContentText>
				</DialogContent>
			</Dialog>
		);
	}
}
