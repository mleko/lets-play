import * as React from "react";

import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {Trans} from "react-i18next";
import {Bet, Game, MatchSet, Ranking} from "../../model/models";
import {GameUsersTab} from "./GameUsersTab";
import {MatchList} from "./MatchList";
import {Rules} from "./Rules";
import {TypingView} from "./TypingView";
import {UserRanking} from "./UserRanking";

export interface GameViewProps {
	tab: string;
	game: Game;
	matchSet: MatchSet;
	bets: Bet[];
	ranking: Ranking;

	onBetSave: (bets: Bet[]) => any;
	onTabSwitch: (url: string) => any;
}

export class GameView extends React.PureComponent<GameViewProps, {}> {

	public render(): JSX.Element {
		return (
			<div>
				<h2>{this.props.game ? this.props.game.name : ""}</h2>
				<AppBar position={"static"} color={"default"}>
					<Tabs
						value={this.props.tab}
						scrollable={true}
						scrollButtons={"off"}
						onChange={this.changeActiveTab}
					>
						<Tab label={<Trans>Picks</Trans>} value={"bets"}/>
						<Tab label={<Trans>Matches</Trans>} value={"matches"}/>
						<Tab label={"Ranking"} value={"ranking"}/>
						<Tab label={<Trans>Users</Trans>} value={"users"}/>
						<Tab label={<Trans>Rules</Trans>} value={"rules"}/>
					</Tabs>
				</AppBar>
				{this.renderTabContent()}

			</div>
		);
	}

	private renderTabContent() {
		if (this.props.tab === "matches") {
			return this.renderMatchList();
		} else if (this.props.tab === "ranking") {
			return this.renderRanking();
		} else if (this.props.tab  === "users") {
			return this.renderUsersView();
		} else if (this.props.tab  === "rules") {
			return this.renderRules();
		}
		return this.renderTypingView();
	}

	private renderTypingView() {
		if (!this.props.game) {
			return this.renderProgress();
		}
		return (
			<TypingView
				gameId={this.props.game.id}
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
				gameId={this.props.game.id}
				matches={this.props.matchSet.matches}
				bets={this.props.bets}
				showMatchBetsButton={true}
			/>
		);
	}

	private renderRanking() {
		if (!this.props.ranking) {
			return this.renderProgress();
		}
		return (
			<UserRanking gameId={this.props.game.id} ranking={this.props.ranking}/>
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

	private changeActiveTab = (event: React.SyntheticEvent<any>, value: string) => {
		this.props.onTabSwitch("/games/" + this.props.game.id + "/" + value);
		// this.setState({activeTab: value});
	};
}
