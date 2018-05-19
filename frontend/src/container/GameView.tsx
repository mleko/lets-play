import * as React from "react";
import {GameView as Component} from "../component/GameView";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {Bet, Game, MatchSet} from "../model/models";

export interface GameViewProps {
	gameId: string;
}

export class GameView extends React.PureComponent<GameViewProps, State> {

	protected static contextTypes = httpContextValidationMap;

	public constructor(props: GameViewProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (
			<Component
				game={this.state.game}
				matchSet={this.state.matchSet}
				onBetSave={this.saveBets}
			/>
		);
	}

	public componentDidMount() {
		const client: Client = this.context.httpClient;
		client.request({url: "/games/" + this.props.gameId, method: "GET"})
			.then((response: Response<Game>) => {
				return response.data;
			})
			.then((game: Game) => {
				this.setState({game});
				this.loadMatchSet(game.matchSetId);
			});
	}

	private loadMatchSet = (matchSetId: string) => {
		const client: Client = this.context.httpClient;
		client.request({url: "/match-sets/" + matchSetId})
			.then((response: Response<MatchSet>) => {
				return response.data;
			})
			.then((matchSet: MatchSet) => {
				this.setState({matchSet});
			});
	};

	private saveBets = (bets: Bet[]) => {
		const client: Client = this.context.httpClient;
		client.request({url: "/games/" + this.props.gameId + "/bets", method: "PUT", data: bets});
	}
}

interface State {
	game?: Game;
	matchSet?: MatchSet;
}
