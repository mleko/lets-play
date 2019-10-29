import * as React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {Trans} from "react-i18next";
import {UserBetsDialog} from "../../container/UserBetsDialog";
import {Ranking, RankingEntry} from "../../model/models";
import {RankingTableRow} from "./RankingRow";

export interface UserRankingProps {
	gameId: string;
	ranking: Ranking;
}

export class UserRanking extends React.PureComponent<UserRankingProps, State> {
	public constructor(props: UserRankingProps) {
		super(props);
		this.state = {
			betsDialogData: null
		};
	}

	public render(): JSX.Element {

		const rows: RankingRow[] = this.props.ranking.map((e: RankingEntry, index: number) => {
			return {
				position: index + 1,
				username: e.user.name,
				points: e.points,
				userId: e.userId
			};
		});

		for (let i = 1; i < rows.length; i++) {
			if (rows[i].points === rows[i - 1].points) {
				rows[i].position = rows[i - 1].position;
			}
		}

		return (
			<div style={{width: "100%", overflow: "scroll"}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><Trans>Position</Trans></TableCell>
							<TableCell><Trans>User</Trans></TableCell>
							<TableCell><Trans>Points</Trans></TableCell>
							<TableCell style={{width: 1}}/>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(this.renderRow)}
					</TableBody>
				</Table>
				{this.renderDialog()}
			</div>
		);
	}

	private renderRow = (r: RankingRow, index: number) => {
		return (
			<RankingTableRow row={r} key={index} onShowBets={this.showBets}/>
		);
	};

	private renderDialog() {
		if (!this.state.betsDialogData) {
			return null;
		}
		return (
			<UserBetsDialog
				gameId={this.props.gameId}
				userId={this.state.betsDialogData.userId}
				title={this.state.betsDialogData.username}
				onClose={this.closeDialog}
			/>
		);
	}

	private showBets = (userId: string, username: string) => {
		this.setState({betsDialogData: {userId, username}});
	};

	private closeDialog = () => {
		this.setState({betsDialogData: null});
	}
}

export interface RankingRow {
	position: number;
	username: string;
	points: number;
	userId: string;
}

interface State {
	betsDialogData: { userId: string, username: string } | null;
}
