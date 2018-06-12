import * as React from "react";

import {TableBody, TableCell, TableHead, TableRow} from "material-ui";
import Table from "material-ui/Table";
import {Trans} from "react-i18next";

export class Rules extends React.PureComponent<{}, {}> {
	public render(): JSX.Element {
		return (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell><Trans>Description</Trans></TableCell>
						<TableCell numeric={true}><Trans>Points</Trans></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell><Trans>Predicting exact match score</Trans></TableCell>
						<TableCell numeric={true}>3</TableCell>
					</TableRow>
					<TableRow>
						<TableCell><Trans>Predicting correct match result</Trans></TableCell>
						<TableCell numeric={true}>1</TableCell>
					</TableRow>
					<TableRow>
						<TableCell><Trans>Missed pick</Trans></TableCell>
						<TableCell numeric={true}>0</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		);
	}
}
