import * as React from "react";
import {ChangeEvent} from "react";

import {FormControl, InputLabel} from "material-ui";
import {Add as AddIcon, Save as SaveIcon} from "material-ui-icons";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Input from "material-ui/Input";
import {replace, without} from "typescript-array-utils";

import {Match, MatchSet} from "../model/models";
import {DateTime} from "../utility/DateTime";
import {MatchRow} from "./MatchRow";

export interface MatchSetViewProps {
	matchId?: string;
	loadMatchSet: (matchId: string) => Promise<MatchSet>;
}

export interface MatchSetViewActions {
	onSave?: (set: MatchSet) => any;
}

export class MatchSetView extends React.PureComponent<MatchSetViewProps & MatchSetViewActions, MatchSetViewState> {

	public constructor(props: MatchSetViewProps) {
		super(props);
		this.state = {
			name: "",
			matches: []
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<FormControl fullWidth={true} style={{marginBottom: 16}}>
					<InputLabel>Name</InputLabel>
					<Input
						value={this.state.name}
						onChange={this.changeName}
					/>
				</FormControl>
				{this.renderMatches()}
				<FormControl fullWidth={true} style={{marginTop: 8}}>
					<Button variant={"raised"} color={"primary"} onClick={this.save}><SaveIcon/>Save</Button>
				</FormControl>
				<Button variant={"fab"} style={{position: "absolute", bottom: 20, right: 20}} onClick={this.addMatch}>
					<AddIcon/>
				</Button>
			</div>
		);
	}

	public componentDidMount(): void {
		if (this.props.matchId) {
			this.props.loadMatchSet(this.props.matchId)
				.then((set: MatchSet) => {
					this.setState(set);
				});
		}
	}

	private renderMatches() {
		return (
			<Grid container={true} spacing={16}>
				{this.state.matches.map(this.renderMatch)}
			</Grid>
		);
	}

	private renderMatch = (match: Match, index: number) => {
		return (
			<MatchRow
				key={match.id || String(index)}
				index={index}
				match={match}
				editDate={true}
				editName={true}
				onRemove={this.removeMatch}
				onChange={this.updateMatch}
			/>
		);
	};

	private addMatch = () => {
		this.setState({
			matches: this.state.matches.concat({
				id: "",
				startDate: DateTime.toInputString(new Date()),
				home: {name: ""},
				away: {name: ""}
			})
		});
	};

	private save = () => {
		this.props.onSave({id: this.props.matchId, name: this.state.name, matches: this.state.matches});
	};
	private removeMatch = (index: number) => {
		this.setState({matches: without(this.state.matches, index)});
	};
	private updateMatch = (match: Match, index: number) => {
		this.setState({matches: replace(this.state.matches, index, match)});
	};
	private changeName = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({name: event.currentTarget.value});
	};
}

interface MatchSetViewState {
	name: string;
	matches: Match[];
}
