import * as React from "react";

import {Button, IconButton, Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import {Add as AddIcon, Edit as EditIcon, PlayArrow as PlayIcon} from "material-ui-icons";
import {LinkIconButton} from "../LinkIconButton";

export class MatchSetList extends React.PureComponent<{}, {}> {
	public render(): JSX.Element {

		const sets = [
			{
				id: "acd34d2",
				name: "Euro 2020"
			},
			{
				id: "acd3456",
				name: "Euro 2024"
			}
		];

		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={{width: 1}}>
								<div>Play</div>
							</TableCell>
							<TableCell style={{width: 1}}>
								<div>Edit</div>
							</TableCell>
							<TableCell padding="none">Set name</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sets.map(this.renderRow)}
					</TableBody>
				</Table>
				<Button variant="fab" style={{position: "absolute", bottom: 20, right: 20}}><AddIcon/></Button>
			</div>
		);
	}

	private renderRow = (element: any, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>
					<LinkIconButton to={"/game/" + element.id}>
						<PlayIcon style={{cursor: "pointer"}}/>
					</LinkIconButton>
				</TableCell>
				<TableCell>
					<IconButton>
						<EditIcon style={{cursor: "pointer"}}/>
					</IconButton>
				</TableCell>
				<TableCell padding="none">{element.name}</TableCell>
			</TableRow>
		);
	}
}
