import * as React from "react";
import {ChangeEvent} from "react";

import AddIcon from "material-ui-icons/Add";
import SaveIcon from "material-ui-icons/Save";
import Button from "material-ui/Button";
import FormControl from "material-ui/Form/FormControl";
import Grid from "material-ui/Grid";
import Input from "material-ui/Input";
import InputLabel from "material-ui/Input/InputLabel";
import Tooltip from "material-ui/Tooltip";
import {Trans} from "react-i18next";
import {replace, without} from "typescript-array-utils";
import {merge} from "typescript-object-utils";

import {Match, MatchSet, User} from "../model/models";
import {MatchRow} from "./MatchRow";

export interface MatchSetViewProps {
	set: MatchSet;
	user: User;
}

export interface MatchSetViewActions {
	onUpdate?: (set: MatchSet) => any;
	onSave?: () => any;
}

export class MatchSetView extends React.PureComponent<MatchSetViewProps & MatchSetViewActions, {}> {

	public render(): JSX.Element {
		const editable = this.isEditable();
		return (
			<div>
				<FormControl fullWidth={true} style={{marginBottom: 16}}>
					<InputLabel><Trans>Name</Trans></InputLabel>
					<Input
						value={this.props.set.name}
						onChange={editable ? this.changeName : undefined}
						disabled={!editable}
					/>
				</FormControl>
				{this.renderMatches()}
				{this.renderButtons()}
			</div>
		);
	}

	private isEditable = (): boolean => {
		return null != this.props.onUpdate && null != this.props.onSave;
	};

	private renderMatches() {
		return (
			<Grid container={true} spacing={16}>
				{this.props.set.matches.map(this.renderMatch)}
			</Grid>
		);
	}

	private renderButtons() {
		if (!this.isEditable()) {
			return null;
		}
		return (
			<div style={{textAlign: "center"}}>
				<FormControl style={{marginTop: 8}}>
					<Button
						color={"primary"}
						onClick={this.addMatch}
					>
						<AddIcon/><Trans>Add match</Trans>
					</Button>
				</FormControl>
				<FormControl fullWidth={true} style={{marginTop: 8}}>
					<Button
						variant={"raised"}
						color={"primary"}
						onClick={this.props.onSave}
					>
						<SaveIcon/><Trans>Save</Trans>
					</Button>
				</FormControl>
				<Tooltip title={<Trans>Add match</Trans>}>
					<Button
						variant={"fab"}
						color={"primary"}
						style={{position: "absolute", bottom: 20, right: 20}}
						onClick={this.addMatch}
					>
						<AddIcon/>
					</Button>
				</Tooltip>
			</div>
		);
	}

	private renderMatch = (match: Match, index: number) => {
		const editable = this.isEditable();
		return (
			<MatchRow
				key={match.id || String(index)}
				index={index}
				match={match}
				editDate={editable}
				editName={editable}
				onRemove={editable ? this.removeMatch : undefined}
				onChange={editable ? this.updateMatch : undefined}
			/>
		);
	};

	private addMatch = () => {
		const now = new Date();
		now.setMinutes(0, 0, 0);
		this.props.onUpdate(merge(this.props.set,
			{
				matches: this.props.set.matches.concat({
					id: "",
					startDate: now,
					home: {name: ""},
					away: {name: ""}
				})
			})
		);
	};

	private removeMatch = (index: number) => {
		this.props.onUpdate(merge(this.props.set,
			{
				matches: without(this.props.set.matches, index)
			})
		);
	};
	private updateMatch = (match: Match, index: number) => {
		this.props.onUpdate(merge(this.props.set,
			{
				matches: replace(this.props.set.matches, index, match)
			})
		);
	};
	private changeName = (event: ChangeEvent<HTMLInputElement>) => {
		this.props.onUpdate(merge(this.props.set,
			{
				name: event.currentTarget.value
			})
		);
	};
}
