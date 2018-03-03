import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";

export interface RankingProps {

}

interface Result {
	user: User;
	points: number;
}
interface User {
	name: string;
}

export class Ranking extends React.PureComponent<RankingProps, {}> {

	public render(): JSX.Element {

		const results: Result[] = [
			{
				user: {name: "Mleko"},
				points: 4
			},
			{
				user: {name: "Kefir"},
				points: 43
			},
			{
				user: {name: "Śmietana"},
				points: 41
			}
		];

		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Użytkownik</TableCell>
						<TableCell>Punkty</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{results.map(this.renderRow)}
				</TableBody>
			</Table>
		);
	}

	private renderRow = (m: Result) => {
		return (
			<TableRow>
				<TableCell>{m.user.name}</TableCell>
				<TableCell>{m.points}</TableCell>
			</TableRow>
		);
	}
}
