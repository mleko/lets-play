import * as React from "react";
import {ChangeEvent} from "react";

import Button from "material-ui/Button";
import Dialog, {DialogActions, DialogContent, DialogTitle} from "material-ui/Dialog";
import {FormControl} from "material-ui/Form";
import {InputLabel} from "material-ui/Input";
import TextField from "material-ui/TextField";
import {MatchSet} from "../../model/models";
import {Option, Select} from "../Select";

export interface NewGameDialogProps {
	open: boolean;
	sets: MatchSet[];
	onCreate: (matchSetId: string, name: string) => any;
	onClose: () => any;
}

export class NewGameDialog extends React.PureComponent<NewGameDialogProps, State> {

	public constructor(props: NewGameDialogProps) {
		super(props);
		this.state = {
			name: "",
			matchSetId: ""
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

	private getOptions(): Option[] {
		return this.props.sets ? this.props.sets.map((set) => {
			return {
				label: set.name,
				value: set.id
			};
		}) : [];
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
}
