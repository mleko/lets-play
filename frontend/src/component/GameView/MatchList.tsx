import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import {Trans} from "react-i18next";
import {isNumber} from "util";
import {Bet, HandA, Match} from "../../model/models";

export interface MatchView {
	names: HandA<string>;
	result: HandA<number>;
	bet: HandA<number>;
	date: string;
	points?: number;
}

export interface MatchListProps {
	matches: Match[];
	bets: Bet[];
}

export class MatchList extends React.PureComponent<MatchListProps, {}> {

	private static scoreToString(score: HandA<number>): string {
		if (!score || score.away === null || score.home === null) {
			return " - ";
		}
		return (score.home) + " : " + (score.away);
	}

	public render(): JSX.Element {

		const matches = this.props.matches.map((match: Match): MatchView => {
			const bet = this.props.bets.find((b: Bet) => {
				return b.matchId === match.id;
			});
			return {
				names: {home: match.home.name, away: match.away.name},
				result: {home: match.home.score, away: match.away.score},
				bet: {home: bet ? bet.bet.home : null, away: bet ? bet.bet.away : null},
				date: match.startDate.toLocaleString(),
				points: bet ? bet.points : null
			};
		});

		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell><Trans>Match</Trans></TableCell>
						<TableCell><Trans>Date</Trans></TableCell>
						<TableCell><Trans>Score</Trans></TableCell>
						<TableCell><Trans>Pick</Trans></TableCell>
						<TableCell><Trans>Points</Trans></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{matches.map(this.renderRow)}
				</TableBody>
			</Table>
		);
	}

	private renderRow = (m: MatchView, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>{m.names.home + " : " + m.names.away}</TableCell>
				<TableCell>{m.date}</TableCell>
				<TableCell>{MatchList.scoreToString(m.result)}</TableCell>
				<TableCell>{MatchList.scoreToString(m.bet)}</TableCell>
				<TableCell>{isNumber(m.points) ? m.points : " - "}</TableCell>
			</TableRow>
		);
	};
}
