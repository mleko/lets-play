import * as React from "react";
import {ChangeEvent} from "react";

import {FormControl, InputLabel} from "material-ui";
import {Add as AddIcon, Save as SaveIcon} from "material-ui-icons";
import Button from "material-ui/Button";
import Grid from "material-ui/Grid";
import Input from "material-ui/Input";
import {replace, without} from "typescript-array-utils";

import {Match} from "../model/models";
import {MatchRow} from "./MatchRow";

export interface MatchSetViewProps {

}

export class MatchSetView extends React.PureComponent<MatchSetViewProps, MatchSetViewState> {

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
					<Button variant={"raised"} color={"primary"}><SaveIcon/>Save</Button>
				</FormControl>
				<Button variant={"fab"} style={{position: "absolute", bottom: 20, right: 20}} onClick={this.addMatch}>
					<AddIcon/>
				</Button>
			</div>
		);
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
				onRemove={this.removeMatch}
				onChange={this.updateMatch}
			/>
		);
	};

	private addMatch = () => {
		this.setState({
			matches: this.state.matches.concat({
				id: "",
				startDate: "",
				home: {name: ""},
				away: {name: ""}
			})
		});
	};

	private removeMatch = (index: number) => {
		this.setState({matches: without(this.state.matches, index)});
	};
	private updateMatch = (match: Match, index: number) => {
		this.setState({matches: replace(this.state.matches, index, match)});
	}

	private changeName = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({name: event.currentTarget.value});
	}
}

interface MatchSetViewState {
	name: string;
	matches: Match[];
}
