import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import {Ranking, RankingEntry} from "../../model/models";

export interface UserRankingProps {
	ranking: Ranking;
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

	private renderRow = (r: RankingEntry, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>{index + 1}</TableCell>
				<TableCell>{r.user.name}</TableCell>
				<TableCell>{r.points}</TableCell>
			</TableRow>
		);
	}
}
