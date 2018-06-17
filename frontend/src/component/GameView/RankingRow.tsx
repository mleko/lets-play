import * as React from "react";

import EyeIcon from "material-ui-icons/RemoveRedEye";
import IconButton from "material-ui/IconButton";
import {TableCell, TableRow} from "material-ui/Table";
import {RankingRow} from "./UserRanking";

export interface RankingTableRowProps {
	row: RankingRow;
	onShowBets: (userId: string, username: string) => any;
}

export class RankingTableRow extends React.PureComponent<RankingTableRowProps, {}> {
	public render(): JSX.Element {
		const r = this.props.row;
		return (
			<TableRow>
				<TableCell>{r.position}</TableCell>
				<TableCell>{r.username}</TableCell>
				<TableCell>{r.points}</TableCell>
				<TableCell><IconButton onClick={this.showDialog}><EyeIcon/></IconButton></TableCell>
			</TableRow>
		);
	}

	private showDialog = () => {
		this.props.onShowBets(this.props.row.userId, this.props.row.username);
	}
}
