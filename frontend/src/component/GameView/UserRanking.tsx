import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";

export interface UserRankingProps {
	ranking: UserResult[];
}

interface UserResult {
	username: string;
	points: number;
}

export class UserRanking extends React.PureComponent<UserRankingProps, {}> {
	public render(): JSX.Element {

		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Pozycja</TableCell>
						<TableCell>Użytkownik</TableCell>
						<TableCell>Punkty</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{this.props.ranking.map(this.renderRow)}
				</TableBody>
			</Table>
		);
	}

	private renderRow = (r: UserResult, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>{index + 1}</TableCell>
				<TableCell>{r.username}</TableCell>
				<TableCell>{r.points}</TableCell>
			</TableRow>
		);
	}
}
