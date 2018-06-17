import * as React from "react";

import Paper from "material-ui/Paper";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import {Trans} from "react-i18next";
import {MatchBetsDialog} from "../../container/MatchBetsDialog";
import {Bet, HandA, Match} from "../../model/models";
import {MatchListRow} from "./MatchListRow";

export interface MatchView {
	names: HandA<string>;
	result: HandA<number>;
	bet: HandA<number>;
	date: string;
	points?: number;
	matchId: string;
	locked: boolean;
}

export interface MatchListProps {
	matches: Match[];
	bets: Bet[];
	showMatchBetsButton?: boolean;
	gameId: string;
}

export class MatchList extends React.PureComponent<MatchListProps, State> {

	public static scoreToString(score: HandA<number>): string {
		if (!score || score.away === null || score.home === null) {
			return " - ";
		}
		return (score.home) + " : " + (score.away);
	}

	public constructor(props: MatchListProps) {
		super(props);
		this.state = {
			matchBetsDialogMatchId: null
		};
	}

	public render(): JSX.Element {

		const matches = this.props.matches.map((match: Match): MatchView => {
			const bets = this.props.bets ? this.props.bets : [];
			const bet = bets.find((b: Bet) => {
				return b.matchId === match.id;
			});
			return {
				names: {home: match.home.name, away: match.away.name},
				result: {home: match.home.score, away: match.away.score},
				bet: {home: bet ? bet.bet.home : null, away: bet ? bet.bet.away : null},
				date: match.startDate.toLocaleString(),
				points: bet ? bet.points : null,
				matchId: match.id,
				locked: match.locked
			};
		});

		return (
			<Paper style={{width: "100%", overflow: "scroll"}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><Trans>Match</Trans></TableCell>
							<TableCell><Trans>Date</Trans></TableCell>
							<TableCell padding={"dense"}><Trans>Score</Trans></TableCell>
							<TableCell padding={"dense"}><Trans>Pick</Trans></TableCell>
							<TableCell padding={"dense"}><Trans>Points</Trans></TableCell>
							{this.props.showMatchBetsButton ? <TableCell style={{width: 1}}/> : null}
						</TableRow>
					</TableHead>
					<TableBody>
						{matches.map(this.renderRow)}
					</TableBody>
				</Table>
				{this.renderMatchBetsDialog()}
			</Paper>
		);
	}

	private renderRow = (m: MatchView, index: number) => {
		return (
			<MatchListRow
				matchView={m}
				key={index}
				showMatchBetsButton={this.props.showMatchBetsButton}
				onShowDialog={this.showMatchDialog}
			/>
		);
	};

	private renderMatchBetsDialog() {
		const matchId = this.state.matchBetsDialogMatchId;
		if (!matchId) {
			return null;
		}
		const match = this.props.matches.find((m: Match) => {
			return m.id === matchId;
		});
		let title = match.home.name + " : " + match.away.name;
		if (match.away.score !== null && match.home.score !== null) {
			title += " - " + match.home.score + " : " + match.away.score;
		}
		return (
			<MatchBetsDialog gameId={this.props.gameId} matchId={matchId} title={title} onClose={this.closeDialog}/>
		);
	}

	private showMatchDialog = (matchId: string) => {
		this.setState({matchBetsDialogMatchId: matchId});
	};
	private closeDialog = () => {
		this.setState({matchBetsDialogMatchId: null});
	}
}

interface State {
	matchBetsDialogMatchId?: string;
}
