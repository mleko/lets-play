import * as React from "react";
import {ChangeEvent, CSSProperties} from "react";

import Grid from "material-ui/Grid";
import Input from "material-ui/Input";
import {WithStyles} from "material-ui/styles";
import withStyles from "material-ui/styles/withStyles";
import {MatchTeam} from "../../model/Match";

export interface TeamGridProps {
	left: MatchTeam;
	right: MatchTeam;
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

export const TeamGridSmall = withStyles(styles)(
	class extends React.PureComponent<TeamGridProps & TeamGridActions & WithStyles<"leftMatch">, {}> {
		public render(): JSX.Element[] {
			const {style} = this.props;
			return [
				(
					<Grid
						item={true}
						xs={6}
						hidden={{smUp: true}}
						style={{textAlign: "right", ...style}}
						className={this.props.classes.leftMatch}
						key={"home-l"}
					>
						{this.renderLabel(true)}
					</Grid>
				), (
					<Grid
						item={true}
						xs={6}
						hidden={{smUp: true}}
						style={{textAlign: "left", ...style}}
						key={"away-l"}
					>
						{this.renderLabel(false)}
					</Grid>
				), (
					<Grid
						item={true}
						xs={6}
						hidden={{smUp: true}}
						style={{textAlign: "right", ...style, borderTop: "none"}}
						key={"home-s"}
					>
						{this.renderInput(true)}
					</Grid>
				), (
					<Grid
						item={true}
						xs={6}
						hidden={{smUp: true}}
						style={{textAlign: "left", ...style, borderTop: "none"}}
						key={"away-s"}
					>
						{this.renderInput(false)}
					</Grid>
				)
			];
		}

		private renderLabel(left: boolean) {
			const team = left ? this.props.left : this.props.right;
			const editable = !!this.props.onNameChange;
			const style = {[!left ? "marginLeft" : "marginRight"]: textMargin, textAlign: (left ? "right" : "left")};
			if (!editable) {
				return <span style={style}>{team.name}</span>;
			}
			return (
				<Input
					value={team.name}
					onChange={left ? this.onLeftNameChange : this.onRightNameChange}
					style={style}
					inputProps={{style: {textAlign: (left ? "right" : "left")}}}
				/>
			);
		}

		private renderInput(left: boolean) {
			const team = left ? this.props.left : this.props.right;
			return (
				<Input
					disableUnderline={true}
					style={inputStyle}
					inputProps={{style: {textAlign: "center"}}}
					value={(team.score === undefined || team.score === null) ? "" : team.score}
					onChange={this.props.onScoreChange ? (left ? this.onLeftScoreChange : this.onRightScoreChange) : undefined}
					disabled={!this.props.onScoreChange}
				/>
			);
		}

		private onLeftNameChange = (event: ChangeEvent<HTMLInputElement>) => {
			this.props.onNameChange(event.target.value, true);
		};
		private onLeftScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
			this.props.onScoreChange(+event.target.value, true);
		};

		private onRightNameChange = (event: ChangeEvent<HTMLInputElement>) => {
			this.props.onNameChange(event.target.value, false);
		};
		private onRightScoreChange = (event: ChangeEvent<HTMLInputElement>) => {
			this.props.onScoreChange(+event.target.value, false);
		};
	}
);
