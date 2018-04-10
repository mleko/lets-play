import * as React from "react";

import {Grid} from "material-ui";
import {Match} from "../../model/models";
import {MatchRow} from "../MatchRow";
import {Results} from "../Results";

export interface GameViewProps {
	gameId: string;
}

export class GameView extends React.PureComponent<GameViewProps> {
	public render(): JSX.Element {
		const elements: Match[] = [
			{
				home: {name: "Polska", score: 3},
				away: {name: "Niemcy", score: 2}
			},
			{
				home: {name: "Polska"},
				away: {name: "Niemcy"}
			},
			{
				home: {name: "Polska", score: 1},
				away: {name: "Niemcy", score: 1}
			},
			{
				home: {name: "Polska"},
				away: {name: "Niemcy"}
			},
			{
				home: {name: "Zjednoczone Emiraty Arabskie"},
				away: {name: "Republika Południowej Afryki"}
			},
			{
				home: {name: "Portugalia"},
				away: {name: "Republika Południowej Afryki"}
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

	private renderElement = (e: Match, index: number) => {
		return (<MatchRow match={e} key={String(index)} index={index}/>);
	}
}
