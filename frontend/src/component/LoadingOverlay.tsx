import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

export interface LoadingOverlayProps {
	size: number;
}

export class LoadingOverlay extends React.PureComponent<LoadingOverlayProps, {}> {
	public render(): JSX.Element {
		return (
			<div style={loadingStyle}>
				<CircularProgress size={this.props.size}/>
			</div>
		);
	}
}
const loadingStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	bottom: 0,
	backgroundColor: "#fafafa"
};
