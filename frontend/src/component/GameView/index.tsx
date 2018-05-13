import * as React from "react";

import {Grid, Tab} from "material-ui";
import Tabs from "material-ui/Tabs";
import {Game, Match, MatchSet} from "../../model/models";
import {MatchRow} from "../MatchRow";
import {Results} from "../Results";
import {Match as ViewMatch, MatchList} from "./MatchList";
import {UserRanking} from "./UserRanking";
import AppBar from "material-ui/AppBar";

export interface GameViewProps {
	game: Game;
	matchSet: MatchSet;
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
				<AppBar position={"static"}>
					<Tabs
						value={this.state.activeTab}
						fullWidth={true}
						onChange={this.changeActiveTab}
					>
						<Tab label={"Typowanie"}/>
						<Tab label={"Mecze"}/>
						<Tab label={"Ranking"}/>
					</Tabs>
				</AppBar>
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
		const elements: Match[] = this.props.matchSet ? this.props.matchSet.matches : [];

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
		const matches = this.props.matchSet.matches.map((match: Match): ViewMatch => {
			return {
				teams: [match.home.name, match.away.name],
				result: [match.home.score, match.away.score],
				bets: [null, null]
			};
		});

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
