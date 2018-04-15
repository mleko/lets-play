import * as React from "react";

import {Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import {Add as AddIcon, Edit as EditIcon, PlayArrow as PlayIcon} from "material-ui-icons";
import Button from "material-ui/Button";
import {Game, MatchSet} from "../../model/models";
import {LinkIconButton} from "../LinkIconButton";
import {NewGameDialog} from "./NewGameDialog";

export interface GameListProps {
	loadGames: () => Promise<Game[]>;
	loadSets: () => Promise<MatchSet[]>;
	createGame: (matchSetId: string, name: string) => Promise<Game>;
}

export class GameList extends React.PureComponent<GameListProps, State> {
	public constructor(props: GameListProps) {
		super(props);
		this.state = {
			games: [],
			dialogVisible: false
		};
	}

	public render(): JSX.Element {
		const games = this.state.games;
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
						{games.map(this.renderRow)}
					</TableBody>
				</Table>
				<Button
					variant="fab"
					style={{position: "absolute", bottom: 20, right: 20}}
					onClick={this.showNewGameDialog}
				>
					<AddIcon/>
				</Button>
				{this.renderDialog()}
			</div>
		);
	}

	public componentDidMount(): void {
		this.props.loadGames().then((games) => {
			this.setState({games});
		});
	}

	private renderDialog() {
		return (
			<NewGameDialog
				open={this.state.dialogVisible}
				loadSets={this.props.loadSets}
				onClose={this.closeDialog}
				onCreate={this.createGame}
			/>
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
					<LinkIconButton to={"/match-sets/" + element.id}>
						<EditIcon style={{cursor: "pointer"}}/>
					</LinkIconButton>
				</TableCell>
				<TableCell padding="none">{element.name}</TableCell>
			</TableRow>
		);
	};

	private showNewGameDialog = () => {
		this.setState({dialogVisible: true});
	};
	private closeDialog = () => {
		this.setState({dialogVisible: false});
	};
	private createGame = (matchSetId: string, name: string) => {
		this.setState({dialogVisible: false});
		this.props.createGame(matchSetId, name);
	};
}

interface State {
	games: Game[];
	dialogVisible: boolean;
}
