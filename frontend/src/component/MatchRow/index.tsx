import * as React from "react";
import {ChangeEvent, CSSProperties} from "react";

import {Delete as DeleteIcon} from "material-ui-icons";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import {shallowMerge} from "typescript-object-utils";
import {Match} from "../../model/models";
import {TeamGrid} from "./TeamGrid";

export interface MatchRowProps {
	match: Match;
	editDate: boolean;
	editName: boolean;
	index: number;
}

export interface MatchRowActions {
	onRemove?: (index: number) => any;
	onChange?: (match: Match, index: number) => any;
}

const paperStyle: CSSProperties = {
	padding: 10,
	borderTop: "1px #ddd solid"
};

export class MatchRow extends React.PureComponent<MatchRowProps & MatchRowActions, {}> {
	public render(): JSX.Element[] {
		const {match} = this.props;
		const editable = !!this.props.onChange;
		const removable = !!this.props.onRemove;
		const gridSize = removable ? 4 : 5;
		const elements = [
			(
				<TeamGrid
					team={match.home}
					left={true}
					gridSize={gridSize}
					style={paperStyle}
					key={"home"}
					onNameChange={this.props.editName && editable ? this.onNameChange : undefined}
					onScoreChange={editable ? this.onScoreChange : undefined}
				/>
			),
			(
				<TeamGrid
					team={match.away}
					left={false}
					gridSize={gridSize}
					style={paperStyle}
					key={"away"}
					onNameChange={this.props.editName && editable ? this.onNameChange : undefined}
					onScoreChange={editable ? this.onScoreChange : undefined}
				/>
			)
		];
		elements.push(this.renderDate(editable));
		if (removable) {
			elements.push((
				<Grid item={true} xs={1} style={{textAlign: "right", ...paperStyle}} key={"remove"}>
					<IconButton onClick={this.remove}><DeleteIcon/></IconButton>
				</Grid>
			));
		}
		return elements;
	}

	private renderDate(editable: boolean) {
		if (editable && this.props.editDate) {
			return (
				<Grid item={true} xs={3} style={paperStyle} key={"dateTimePicker"}>
					<TextField
						type="datetime-local"
						value={this.props.match.startDate}
						onChange={this.updateDate}
					/>
				</Grid>
			);
		}
		return (
			<Grid item={true} xs={2} style={paperStyle} key={"dateTime"}>
				<TextField
					type="text"
					value={this.props.match.startDate}
					onChange={this.updateDate}
					disabled={true}
				/>
			</Grid>
		);
	}

	private remove = () => {
		this.props.onRemove(this.props.index);
	};

	private onNameChange = (name: string, left: boolean) => {
		const mergedTeam = shallowMerge(this.props.match[left ? "home" : "away"], {name});
		this.props.onChange(shallowMerge(this.props.match, {[left ? "home" : "away"]: mergedTeam}), this.props.index);
	};
	private onScoreChange = (score: number, left: boolean) => {
		const mergedTeam = shallowMerge(this.props.match[left ? "home" : "away"], {score});
		this.props.onChange(shallowMerge(this.props.match, {[left ? "home" : "away"]: mergedTeam}), this.props.index);
	};

	private updateDate = (event: ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(shallowMerge(this.props.match, {startDate: event.target.value}), this.props.index);
	}
}
