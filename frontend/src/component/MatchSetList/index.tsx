import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import {Add as AddIcon, Edit as EditIcon} from "material-ui-icons";
import {MatchSet} from "../../model/models";
import {LinkButton} from "../LinkButton";
import {LinkIconButton} from "../LinkIconButton";

export interface MatchSetListProps {
	loadSets: () => Promise<MatchSet[]>;
}

export class MatchSetList extends React.PureComponent<MatchSetListProps, State> {
	public constructor(props: MatchSetListProps) {
		super(props);
		this.state = {
			sets: []
		};
	}

	public render(): JSX.Element {
		const sets = this.state.sets;
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
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
				<LinkButton
					to={"/match-sets/new"}
					variant="fab"
					style={{position: "absolute", bottom: 20, right: 20}}
				>
					<AddIcon/>
				</LinkButton>
			</div>
		);
	}

	public componentDidMount(): void {
		this.props.loadSets().then((sets) => {
			this.setState({sets});
		});
	}

	private renderRow = (element: any, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>
					<LinkIconButton to={"/match-sets/" + element.id}>
						<EditIcon style={{cursor: "pointer"}}/>
					</LinkIconButton>
				</TableCell>
				<TableCell padding="none">{element.name}</TableCell>
			</TableRow>
		);
	};
}

interface State {
	sets: MatchSet[];
}
