import * as React from "react";
import {ChangeEvent, CSSProperties} from "react";

import {WithStyles} from "material-ui";
import Grid from "material-ui/Grid";
import {GridSize} from "material-ui/Grid/Grid";
import Input from "material-ui/Input";
import withStyles from "material-ui/styles/withStyles";
import {MatchTeam} from "../../model/Match";

export interface TeamGridProps {
	team: MatchTeam;
	gridSize: GridSize;
	left: boolean;
	style: CSSProperties;
}

export interface TeamGridActions {
	onNameChange?: (name: string, left: boolean) => any;
	onScoreChange?: (score: number, left: boolean) => any;
}

const inputStyle: CSSProperties = {
	width: "3em",
	border: "1px #ddd solid"
};
const textMargin = 16;
const styles = {
	leftMatch: {
		"&:after": {
			content: "\":\"",
			position: "relative",
			left: 10,
			fontWeight: "bold"
		}
	}
};

export const TeamGrid = withStyles(styles)(
	class extends React.PureComponent<TeamGridProps & TeamGridActions & WithStyles<"leftMatch">, {}> {
		public render(): JSX.Element {
			const {gridSize, style, left, team} = this.props;
			return (
				<Grid
					item={true}
					xs={gridSize}
					style={{textAlign: (left ? "right" : "left"), ...style}}
					className={left ? this.props.classes.leftMatch : undefined}
					key={"home"}
				>
					{this.renderLabel(true)}
					<Input
						disableUnderline={true}
						style={inputStyle}
						inputProps={{style: {textAlign: "center"}}}
						value={team.score || ""}
						onChange={this.props.onScoreChange ? this.onScoreChange : undefined}
						disabled={!this.props.onScoreChange}
					/>
					{this.renderLabel(false)}
				</Grid>
			);
		}

		private renderLabel(left: boolean) {
			if (this.props.left !== left) {
				return null;
			}
			const {team} = this.props;
			const editable = !!this.props.onNameChange;
			const style = {[!left ? "marginLeft" : "marginRight"]: textMargin};
			if (!editable) {
				return <span style={style}>{team.name}</span>;
			}
			return (
				<Input
					value={team.name}
					onChange={this.onNameChange}
					style={style}
				/>
			);
		}

		private onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
			this.props.onNameChange(event.target.value, this.props.left);
		};
		private onScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
			this.props.onScoreChange(+event.target.value, this.props.left);
		};
	}
);
