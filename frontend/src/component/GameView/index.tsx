import * as React from "react";

import {Grid, Tab} from "material-ui";
import Tabs from "material-ui/Tabs";
import {Game, Match} from "../../model/models";
import {MatchRow} from "../MatchRow";
import {Results} from "../Results";
import {Match as ViewMatch, MatchList} from "./MatchList";
import {UserRanking} from "./UserRanking";

export interface GameViewProps {
	game: Game;
}

export class GameView extends React.PureComponent<GameViewProps, GameViewState> {

	public constructor(props: GameViewProps) {
		super(props);
		this.state = {
			activeTab: 0
		};
	}

	public render(): JSX.Element {
		return (
			<div>
				<h2>{this.props.game ? this.props.game.name : ""}</h2>
				<Tabs
					value={this.state.activeTab}
					fullWidth={true}
					indicatorColor={"primary"}
					onChange={this.changeActiveTab}
				>
					<Tab label={"Typowanie"}/>
					<Tab label={"Mecze"}/>
					<Tab label={"Ranking"}/>
				</Tabs>
				{this.renderTabContent()}

			</div>
		);
	}

	private renderTabContent() {
		if (this.state.activeTab === 1) {
			return this.renderMatchList();
		}
		if (this.state.activeTab === 2) {
			return this.renderRanking();
		}
		return this.renderTypingView();
	}

	private renderTypingView() {
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

		return [
			(
				<Grid container={true} spacing={16} style={{marginTop: 16}}>
					{elements.map(this.renderElement)}
				</Grid>
			),
			<Results/>
		];
	}

	private renderMatchList() {
		const matches: ViewMatch[] = [
			{
				teams: ["Polska", "Niemcy"],
				result: [1, 2],
				bets: [1, 2]
			}
		];

		return (
			<MatchList matches={matches}/>
		);
	}

	private renderRanking() {
		const ranking = [
			{username: "Mleko", points: 123},
			{username: "Tadek", points: 33},
			{username: "Zenek", points: 23},
		];
		return (
			<UserRanking ranking={ranking}/>
		);
	}

	private changeActiveTab = (event: React.SyntheticEvent<any>, value: number) => {
		this.setState({activeTab: value});
	};

	private renderElement = (e: Match, index: number) => {
		return (<MatchRow match={e} key={String(index)} index={index}/>);
	};
}

interface GameViewState {
	activeTab: number;
}
