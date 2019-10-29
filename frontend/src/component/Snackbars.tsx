import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import {Trans} from "react-i18next";

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
				message={<span id="message-id"><Trans>{this.props.message}</Trans></span>}
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
