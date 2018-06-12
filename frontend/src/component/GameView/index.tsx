import * as React from "react";

import {Tab} from "material-ui";
import AppBar from "material-ui/AppBar";
import Tabs from "material-ui/Tabs";
import {Bet, Game, MatchSet, Ranking} from "../../model/models";
import {GameUsersTab} from "./GameUsersTab";
import {MatchList} from "./MatchList";
import {TypingView} from "./TypingView";
import {UserRanking} from "./UserRanking";

export interface GameViewProps {
	game: Game;
	matchSet: MatchSet;
	bets: Bet[];
	ranking: Ranking;

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
				<AppBar position={"static"} color={"default"}>
					<Tabs
						value={this.state.activeTab}
						fullWidth={true}
						onChange={this.changeActiveTab}
					>
						<Tab label={"Typowanie"}/>
						<Tab label={"Mecze"}/>
						<Tab label={"Ranking"}/>
						<Tab label={"Użytkownicy"}/>
					</Tabs>
				</AppBar>
				{this.renderTabContent()}

			</div>
		);
	}

	private renderTabContent() {
		if (this.state.activeTab === 1) {
			return this.renderMatchList();
		} else if (this.state.activeTab === 2) {
			return this.renderRanking();
		} else if (this.state.activeTab === 3) {
			return this.renderUsersView();
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

		return (
			<MatchList
				matches={this.props.matchSet.matches}
				bets={this.props.bets}
			/>
		);
	}

	private renderRanking() {
		return (
			<UserRanking ranking={this.props.ranking}/>
		);
	}

	private renderUsersView() {
		return (
			<GameUsersTab gameId={this.props.game.id}/>
		);
	}

	private changeActiveTab = (event: React.SyntheticEvent<any>, value: number) => {
		this.setState({activeTab: value});
	};
}

interface GameViewState {
	activeTab: number;
}
