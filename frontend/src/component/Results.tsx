import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";

interface Match {
	teams: [string, string];
	result: [number, number];
	bets: [number, number];
}

export class Results extends React.PureComponent<{}, {}> {

	public render(): JSX.Element {

		const matches: Match[] = [
			{
				teams: ["Polska", "Niemcy"],
				result: [1, 2],
				bets: [1, 2]
			}
		];

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

	private renderRow = (m: Match) => {
		return (
			<TableRow>
				<TableCell>{m.teams.join(" : ")}</TableCell>
				<TableCell>-</TableCell>
				<TableCell>{m.result.join(" : ")}</TableCell>
				<TableCell>{m.bets.join(" : ")}</TableCell>
				<TableCell>-</TableCell>
			</TableRow>
		);
	}
}
