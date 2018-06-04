import * as React from "react";

import {Close as CloseIcon} from "material-ui-icons";
import IconButton from "material-ui/IconButton";
import Snackbar from "material-ui/Snackbar";

export interface SnackbarsProps {
	show: boolean;
	message?: string;
	onClose: (event: any, reason: "timeout" | "clickaway") => any;
	onExited: () => any;
}

export class Snackbars extends React.PureComponent<SnackbarsProps, {}> {
	public render(): JSX.Element {
		const button = (
			<IconButton
				key="close"
				aria-label="Close"
				color="inherit"
				onClick={this.close}
			>
				<CloseIcon/>
			</IconButton>
		);
		return (
			<Snackbar
				anchorOrigin={{vertical: "bottom", horizontal: "left"}}
				open={this.props.show}
				autoHideDuration={6000}
				message={<span id="message-id">{this.props.message}</span>}
				onClose={this.props.onClose}
				onExited={this.props.onExited}
				action={button}
			/>
		);
	}

	private close = () => {
		this.props.onClose(null, "clickaway");
	}
}
