import * as React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {Trans} from "react-i18next";

export class Rules extends React.PureComponent<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
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
				<div style={{margin: "1em", textAlign: "justify"}}>
					<Typography variant="body2" gutterBottom={true}>
						<Trans>Knock-out stage</Trans>
					</Typography>
					<Typography>
						<Trans>Bets will be settled on the result at the end of the regular game time which includes
							injury time but excludes official extra time and penalty shoot outs</Trans>.
					</Typography>
				</div>
			</div>
		);
	}
}
