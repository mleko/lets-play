import * as React from "react";

import AddIcon from "material-ui-icons/Add";
import PlayIcon from "material-ui-icons/PlayArrow";
import Button from "material-ui/Button";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import Tooltip from "material-ui/Tooltip";
import {Trans} from "react-i18next";
import {Game, MatchSet} from "../../model/models";
import {Link} from "../Link";
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
			dialogVisible: false,
			sets: null
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell style={{width: 1}}>
								<div><Trans>Play</Trans></div>
							</TableCell>
							<TableCell padding="none"><Trans>Game name</Trans></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.renderRows()}
					</TableBody>
				</Table>
				<Tooltip title={<Trans>Create new game</Trans>}>
					<Button
						variant="fab"
						style={{position: "absolute", bottom: 20, right: 20}}
						color={"primary"}
						onClick={this.showNewGameDialog}
					>
						<AddIcon/>
					</Button>
				</Tooltip>
				{this.renderDialog()}
			</div>
		);
	}

	public componentDidMount(): void {
		this.loadGames();
	}

	private loadGames() {
		this.props.loadGames().then((games) => {
			this.setState({games});
		});
	}

	private renderDialog() {
		return (
			<NewGameDialog
				open={this.state.dialogVisible}
				sets={this.state.sets}
				onClose={this.closeDialog}
				onCreate={this.createGame}
			/>
		);
	}

	private renderRows() {
		const games = this.state.games;
		if (games.length === 0) {
			return (
				<TableRow>
					<TableCell colSpan={2}>
						<Trans>You're not playing any game. Create a new one or ask your friends to join an existing game.</Trans>
					</TableCell>
				</TableRow>
			);
		}
		return (
			games.map(this.renderRow)
		);
	}

	private renderRow = (element: any, index: number) => {
		return (
			<TableRow key={index}>
				<TableCell>
					<LinkIconButton to={"/games/" + element.id}>
						<PlayIcon style={{cursor: "pointer"}}/>
					</LinkIconButton>
				</TableCell>
				<TableCell padding="none"><Link to={"/games/" + element.id}>{element.name}</Link></TableCell>
			</TableRow>
		);
	};

	private showNewGameDialog = () => {
		if (null === this.state.sets) {
			this.setState({sets: []});
			this.props.loadSets()
				.then((sets) => {
					this.setState({sets});
				});
		}
		this.setState({dialogVisible: true});
	};
	private closeDialog = () => {
		this.setState({dialogVisible: false});
	};
	private createGame = (matchSetId: string, name: string) => {
		this.setState({dialogVisible: false});
		this.props.createGame(matchSetId, name)
			.then(() => {
				this.loadGames();
			});
	};
}

interface State {
	games: Game[];
	sets: MatchSet[];
	dialogVisible: boolean;
}
