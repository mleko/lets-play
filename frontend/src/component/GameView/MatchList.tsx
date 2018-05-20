import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import {Bet, HandA, Match} from "../../model/models";

export interface MatchView {
	names: HandA<string>;
	result: HandA<number>;
	bet: HandA<number>;
	date: string;
}

export interface MatchListProps {
	matches: Match[];
	bets: Bet[];
}

export class MatchList extends React.PureComponent<MatchListProps, {}> {

	public render(): JSX.Element {

		const matches = this.props.matches.map((match: Match): MatchView => {
			const bet = this.props.bets.find((b: Bet) => {
				return b.matchId === match.id;
			});
			return {
				names: {home: match.home.name, away: match.away.name},
				result: {home: match.home.score, away: match.away.score},
				bet: {home: bet ? bet.bet.home : null, away: bet ? bet.bet.away : null},
				date: match.startDate
			};
		});

		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Mecz</TableCell>
						<TableCell>Data</TableCell>
						<TableCell>Wynik</TableCell>
						<TableCell>Typ</TableCell>
						<TableCell>Punkty</TableCell>
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
				<TableCell>-</TableCell>
			</TableRow>
		);
	};

	private static scoreToString(score: HandA<number>): string {
		if (!score || score.away === null || score.home === null) {
			return " - ";
		}
		return (score.home) + " : " + (score.away);
	}
}
