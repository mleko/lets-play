import * as React from "react";

import EyeIcon from "material-ui-icons/RemoveRedEye";
import IconButton from "material-ui/IconButton";
import {TableCell, TableRow} from "material-ui/Table";
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
				<TableCell><div style={{minWidth: "4em"}}>{MatchList.scoreToString(m.result)}</div></TableCell>
				<TableCell><div style={{minWidth: "4em"}}>{MatchList.scoreToString(m.bet)}</div></TableCell>
				<TableCell>{typeof m.points === "number" ? m.points : " - "}</TableCell>
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
			<TableCell><IconButton onClick={this.showDialog}><EyeIcon/></IconButton></TableCell>
		);
	}

	private showDialog = () => {
		if (this.props.onShowDialog) {
			this.props.onShowDialog(this.props.matchView.matchId);
		}
	}

}
