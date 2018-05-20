import * as React from "react";

import {Tab} from "material-ui";
import AppBar from "material-ui/AppBar";
import Tabs from "material-ui/Tabs";
import {Bet, Game, Match, MatchSet} from "../../model/models";
import {Match as ViewMatch, MatchList} from "./MatchList";
import {TypingView} from "./TypingView";
import {UserRanking} from "./UserRanking";

export interface GameViewProps {
	game: Game;
	matchSet: MatchSet;
	bets: Bet[];

	onBetSave: (bets: Bet[]) => any;
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
		return (
			<TypingView
				matchSet={this.props.matchSet}
				bets={this.props.bets}
				onSave={this.props.onBetSave}
			/>
		);
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
}

interface GameViewState {
	activeTab: number;
}
