import * as React from "react";
import {UserBetsDialog as Component} from "../component/GameView/UserBetsDialog";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {MatchSetRepository} from "../model/MatchSet";
import {Bet, Game, MatchSet} from "../model/models";

export interface UserBetsDialogProps {
	gameId: string;
	userId: string;
	title: string;
	onClose: () => any;
}

export class UserBetsDialog extends React.PureComponent<UserBetsDialogProps, State> {

	protected static contextTypes = httpContextValidationMap;

	public constructor(props: UserBetsDialogProps) {
		super(props);
		this.state = {
			bets: null,
			game: null,
			matchSet: null
		};
	}

	public render(): JSX.Element {
		return (
			<Component
				gameId={this.props.gameId}
				matches={this.state.matchSet !== null ? this.state.matchSet.matches : null}
				bets={this.state.bets}
				title={this.props.title}
				onClose={this.props.onClose}
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
		client.request(
			{
				url: "/games/" + this.props.gameId + "/user-bets/" + this.props.userId,
				method: "GET",
				queryData: {include_points: "true"}
			})
			.then((response: Response<Bet[]>) => {
				this.setState({bets: response.data});
			});
	}

	private loadMatchSet = (matchSetId: string) => {
		MatchSetRepository.fetch(matchSetId, this.context.httpClient)
			.then((response: Response<MatchSet>) => {
				this.setState({matchSet: response.data});
			});
	};
}

interface State {
	game?: Game;
	matchSet?: MatchSet;
	bets?: Bet[];
}
