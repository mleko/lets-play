import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EyeIcon from "@material-ui/icons/RemoveRedEye";
import {MatchList, MatchView} from "./MatchList";

export interface MatchListRowProps {
	matchView: MatchView;
	showMatchBetsButton?: boolean;
	onShowDialog?: (matchId: string) => any;
}

export class MatchListRow extends React.PureComponent<MatchListRowProps, {}> {
	public render(): JSX.Element {
		const m = this.props.matchView;
		return (
			<TableRow>
				<TableCell>{m.names.home + " : " + m.names.away}</TableCell>
				<TableCell>{m.date}</TableCell>
				<TableCell padding={"dense"}><div style={{width: "4em"}}>{MatchList.scoreToString(m.result)}</div></TableCell>
				<TableCell padding={"dense"}><div style={{width: "4em"}}>{MatchList.scoreToString(m.bet)}</div></TableCell>
				<TableCell padding={"dense"}>{typeof m.points === "number" ? m.points : " - "}</TableCell>
				{this.renderMatchBetsButton()}
			</TableRow>
		);
	}

	private renderMatchBetsButton() {
		if (!this.props.showMatchBetsButton) {
			return null;
		}
		if (this.props.matchView.locked === false) {
			return (<TableCell/>);
		}
		return (
			<TableCell padding={"none"}><IconButton onClick={this.showDialog}><EyeIcon/></IconButton></TableCell>
		);
	}

	private showDialog = () => {
		if (this.props.onShowDialog) {
			this.props.onShowDialog(this.props.matchView.matchId);
		}
	}

}
