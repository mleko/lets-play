import * as React from "react";

import AppBar from "material-ui/AppBar";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Tabs from "material-ui/Tabs";
import Tab from "material-ui/Tabs/Tab";
import {Trans} from "react-i18next";
import {Bet, Game, MatchSet, Ranking} from "../../model/models";
import {GameUsersTab} from "./GameUsersTab";
import {MatchList} from "./MatchList";
import {Rules} from "./Rules";
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
						scrollable={true}
						scrollButtons={"off"}
						onChange={this.changeActiveTab}
					>
						<Tab label={<Trans>Picks</Trans>}/>
						<Tab label={<Trans>Matches</Trans>}/>
						<Tab label={"Ranking"}/>
						<Tab label={<Trans>Users</Trans>}/>
						<Tab label={<Trans>Rules</Trans>}/>
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
		} else if (this.state.activeTab === 4) {
			return this.renderRules();
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
		if (!this.props.matchSet) {
			return this.renderProgress();
		}
		return (
			<MatchList
				matches={this.props.matchSet.matches}
				bets={this.props.bets}
			/>
		);
	}

	private renderRanking() {
		if (!this.props.ranking) {
			return this.renderProgress();
		}
		return (
			<UserRanking ranking={this.props.ranking}/>
		);
	}

	private renderUsersView() {
		if (!this.props.game) {
			return this.renderProgress();
		}
		return (
			<GameUsersTab gameId={this.props.game.id}/>
		);
	}

	private renderRules() {
		return (
			<Rules/>
		);
	}

	private renderProgress() {
		return (
			<div style={{textAlign: "center"}}>
				<CircularProgress size={160}/>
			</div>
		);
	}

	private changeActiveTab = (event: React.SyntheticEvent<any>, value: number) => {
		this.setState({activeTab: value});
	};
}

interface GameViewState {
	activeTab: number;
}
