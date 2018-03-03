import * as React from "react";
import {CSSProperties} from "react";

import {Grid, Input, withStyles, WithStyles} from "material-ui";
import {Results} from "../Results";

export interface GameViewProps {
	gameId: string;
}

interface Match {
	labels: string[];
	scores: number[];
}

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

class RawGameView extends React.PureComponent<GameViewProps & WithStyles<"leftMatch">> {
	public render(): JSX.Element {
		const elements: Match[] = [
			{
				labels: ["Polska", "Niemcy"],
				scores: [3, 2]
			},
			{
				labels: ["Polska", "Niemcy"],
				scores: []
			},
			{
				labels: ["Polska", "Niemcy"],
				scores: [1, 1]
			},
			{
				labels: ["Polska", "Niemcy"],
				scores: []
			},
			{
				labels: ["Zjednoczone Emiraty Arabskie", "Republika Południowej Afryki"],
				scores: []
			},
			{
				labels: ["Portugalia", "Republika Południowej Afryki"],
				scores: []
			},
		];

		return (
			<div>
				<h2>{this.props.gameId}</h2>
				<Grid container={true} spacing={16}>
					{elements.map(this.renderElement)}
				</Grid>
				<Results/>
			</div>
		);
	}

	private renderElement = (e: Match) => {
		const paperStyle: CSSProperties = {
			padding: 10,
			borderTop: "1px #ddd solid"
		};
		const inputStyle: CSSProperties = {
			width: "3em",
			border: "1px #ddd solid"
		};
		const textMargin = 16;
		return (
			[
				(
					<Grid item={true} xs={6} style={{textAlign: "right", ...paperStyle}} className={this.props.classes.leftMatch}>
						<span style={{marginRight: textMargin}}>{e.labels[0]}</span>
						<Input
							disableUnderline={true}
							style={inputStyle}
							inputProps={{style: {textAlign: "center"}}}
							value={e.scores[0]}
						/>
					</Grid>
				),
				(
					<Grid item={true} xs={6} style={paperStyle}>
						<Input
							disableUnderline={true}
							style={inputStyle}
							inputProps={{style: {textAlign: "center"}}}
							value={e.scores[1]}
						/>
						<span style={{marginLeft: textMargin}}>{e.labels[1]}</span>
					</Grid>
				)
			]
		);
	}
}

export const GameView = withStyles(styles)(RawGameView);
