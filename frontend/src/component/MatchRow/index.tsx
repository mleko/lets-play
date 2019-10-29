import * as React from "react";
import {ChangeEvent, CSSProperties} from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import {shallowMerge} from "typescript-object-utils";
import {Match} from "../../model/Match";
import {DateTime} from "../../utility/DateTime";
import {TeamGridSmall} from "./TeamGridSmall";
import {TeamGridWide as TeamGrid} from "./TeamGridWide";

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
		const gridSize = 4;
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
					style={{...paperStyle}}
					key={"away"}
					onNameChange={this.props.editName && editable ? this.onNameChange : undefined}
					onScoreChange={editable ? this.onScoreChange : undefined}
				/>
			), (
				<TeamGridSmall
					left={match.home}
					right={match.away}
					style={{...paperStyle}}
					key={"small"}
					onNameChange={this.props.editName && editable ? this.onNameChange : undefined}
					onScoreChange={editable ? this.onScoreChange : undefined}
				/>
			)
		];
		elements.push((
			<Hidden smUp={true}>
				<Grid
					item={true}
					xs={2}
					sm={1}
					style={{...paperStyle, borderTop: "none"}}
					key={"empty-pre"}
				/>
			</Hidden>
		));
		elements.push(...this.renderDate(editable));
		if (removable) {
			elements.push((
				<Grid
					item={true}
					xs={2}
					sm={1}
					style={{textAlign: "right", ...paperStyle, borderTop: "none"}}
					key={"remove"}
				>
					<IconButton onClick={this.remove}><DeleteIcon/></IconButton>
				</Grid>
			));
		} else {
			elements.push((<Grid item={true} xs={2} sm={1} style={{...paperStyle, borderTop: "none"}} key={"empty"}/>));
		}
		return elements;
	}

	private renderDate(editable: boolean) {
		const style = {textAlign: "center", ...paperStyle, borderTop: "none"};
		const styleWide = {textAlign: "center", ...paperStyle};
		if (editable && this.props.editDate) {
			return [(
				<Hidden smUp={true}>
					<Grid item={true} xs={8} sm={3} style={style} key={"dateTimePicker-xs"}>
						<TextField
							type="datetime-local"
							value={DateTime.toInputString(this.props.match.startDate)}
							onChange={this.updateDate}
							inputProps={{style: {textAlign: "center"}}}
						/>
					</Grid>
				</Hidden>
			),
				(
					<Hidden xsDown={true}>
						<Grid item={true} xs={8} sm={3} style={styleWide} key={"dateTimePicker"}>
							<TextField
								type="datetime-local"
								value={DateTime.toInputString(this.props.match.startDate)}
								onChange={this.updateDate}
								inputProps={{style: {textAlign: "center"}}}
							/>
						</Grid>
					</Hidden>
				)];
		}
		return [(
			<Hidden smUp={true}>
				<Grid item={true} xs={8} sm={3} style={style} key={"dateTime-xs"}>
					<TextField
						type="text"
						value={this.props.match.startDate.toLocaleString()}
						disabled={true}
						inputProps={{style: {textAlign: "center"}}}
					/>
				</Grid>
			</Hidden>
		), (
			<Hidden xsDown={true}>
				<Grid item={true} xs={8} sm={3} style={styleWide} key={"dateTime"}>
					<TextField
						type="text"
						value={this.props.match.startDate.toLocaleString()}
						disabled={true}
						inputProps={{style: {textAlign: "center"}}}
					/>
				</Grid>
			</Hidden>
		)];
	}

	private remove = () => {
		this.props.onRemove(this.props.index);
	};

	private onNameChange = (name: string, left: boolean) => {
		const mergedTeam = shallowMerge(this.props.match[left ? "home" : "away"], {name});
		this.props.onChange(shallowMerge(this.props.match, {[left ? "home" : "away"]: mergedTeam}), this.props.index);
	};
	private onScoreChange = (score: number, left: boolean) => {
		score = score >= 0 ? score : null;
		const mergedTeam = shallowMerge(this.props.match[left ? "home" : "away"], {score});
		this.props.onChange(shallowMerge(this.props.match, {[left ? "home" : "away"]: mergedTeam}), this.props.index);
	};

	private updateDate = (event: ChangeEvent<HTMLInputElement>) => {
		this.props.onChange(shallowMerge(this.props.match, {startDate: new Date(event.target.value)}), this.props.index);
	}
}
