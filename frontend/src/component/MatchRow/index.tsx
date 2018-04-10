import * as React from "react";
import {CSSProperties} from "react";

import {Delete as DeleteIcon} from "material-ui-icons";
import Grid from "material-ui/Grid";
import IconButton from "material-ui/IconButton";
import {shallowMerge} from "typescript-object-utils";
import {Match, MatchTeam} from "../../model/models";
import {TeamGrid} from "./TeamGrid";

export interface MatchRowProps {
	match: Match;
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
		const {match, onChange} = this.props;
		const removable = !!this.props.onRemove;
		const gridSize = removable ? 5 : 6;
		const elements = [
			(
				<TeamGrid
					team={match.home}
					left={true}
					gridSize={gridSize}
					style={paperStyle}
					key={"home"}
					onChange={onChange ? this.editTeam : undefined}
				/>
			),
			(
				<TeamGrid
					team={match.away}
					left={false}
					gridSize={gridSize}
					style={paperStyle}
					key={"away"}
					onChange={onChange ? this.editTeam : undefined}
				/>
			)
		];
		if (removable) {
			elements.push((
				<Grid item={true} xs={2} style={{textAlign: "right", ...paperStyle}} key={"remove"}>
					<IconButton onClick={this.remove}><DeleteIcon/></IconButton>
				</Grid>
			));
		}
		return elements;
	}

	private remove = () => {
		this.props.onRemove(this.props.index);
	};

	private editTeam = (team: MatchTeam, left: boolean) => {
		this.props.onChange(shallowMerge(this.props.match, {[left ? "home" : "away"]: team}), this.props.index);
	};
}
