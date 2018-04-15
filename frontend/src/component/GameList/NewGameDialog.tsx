import * as React from "react";
import {ChangeEvent} from "react";

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	TextField
} from "material-ui";
import {MatchSet} from "../../model/models";
import {Option, Select} from "../Select";

export interface NewGameDialogProps {
	open: boolean;
	loadSets: () => Promise<MatchSet[]>;
	onCreate: (matchSetId: string, name: string) => any;
	onClose: () => any;
}

export class NewGameDialog extends React.PureComponent<NewGameDialogProps, State> {

	public constructor(props: NewGameDialogProps) {
		super(props);
		this.state = {
			name: "",
			matchSetId: "",
			sets: []
		};
	}

	public render(): JSX.Element {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.props.onClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">New Game</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus={true}
						margin="dense"
						id="name"
						label="Name"
						type="text"
						value={this.state.name}
						fullWidth={true}
						onChange={this.changeName}
					/>
					<FormControl style={{width: "100%"}}>
						<InputLabel htmlFor="new-game-dialog-match-set-select">Match Set</InputLabel>
						<Select
							value={this.state.matchSetId}
							options={this.getOptions()}
							onChange={this.changeMatchSet}
							id={"new-game-dialog-match-set-select"}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.onClose} color="primary">
						Cancel
					</Button>
					<Button onClick={this.create} color="primary" variant={"raised"}>
						Create
					</Button>
				</DialogActions>
			</Dialog>
		);
	}

	public componentDidMount(): void {
		this.props.loadSets()
			.then((sets) => {
				this.setState({sets});
			});
	}

	private getOptions(): Option[] {
		return this.state.sets.map((set) => {
			return {
				label: set.name,
				value: set.id
			};
		});
	}

	private changeName = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({name: event.target.value});
	};
	private changeMatchSet = (id: string) => {
		this.setState({matchSetId: id});
	};
	private create = () => {
		this.props.onCreate(this.state.matchSetId, this.state.name);
	}
}

interface State {
	name: string;
	matchSetId: string;
	sets: MatchSet[];
}
