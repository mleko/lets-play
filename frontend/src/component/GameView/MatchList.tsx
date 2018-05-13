import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";

export interface Match {
	teams: [string, string];
	result: [number, number];
	bets: [number, number];
}

export interface MatchListProps {
	matches: Match[];
}

export class MatchList extends React.PureComponent<MatchListProps, {}> {

	public render(): JSX.Element {

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
					{this.props.matches.map(this.renderRow)}
				</TableBody>
			</Table>
		);
	}

	private renderRow = (m: Match, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>{m.teams.join(" - ")}</TableCell>
				<TableCell>-</TableCell>
				<TableCell>{m.result.join(" : ")}</TableCell>
				<TableCell>{m.bets.join(" : ")}</TableCell>
				<TableCell>-</TableCell>
			</TableRow>
		);
	}
}
