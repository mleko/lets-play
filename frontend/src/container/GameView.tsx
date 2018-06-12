import * as React from "react";
import {connect} from "react-redux";
import {GameView as Component} from "../component/GameView";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {MatchSet, MatchSetRepository} from "../model/MatchSet";
import {Bet, Game, Ranking} from "../model/models";
import {Dispatch} from "../redux/Action";
import {SnackbarActions} from "../redux/module/snackbar";

export interface GameViewProps {
	gameId: string;
}

type CombinedProps = GameViewProps & { onNotification: (message: string) => any };

class GameViewRaw extends React.PureComponent<CombinedProps, State> {

	public static contextTypes = httpContextValidationMap;

	public constructor(props: CombinedProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (
			<Component
				game={this.state.game}
				matchSet={this.state.matchSet}
				bets={this.state.bets}
				ranking={this.state.ranking}
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
		client.request(
			{
				url: "/games/" + this.props.gameId + "/bets",
				method: "GET",
				queryData: {include_points: "true"}
			})
			.then((response: Response<Bet[]>) => {
				this.setState({bets: response.data});
			});
		client.request(
			{
				url: "/games/" + this.props.gameId + "/ranking",
				method: "GET"
			})
			.then((response: Response<Ranking>) => {
				this.setState({ranking: response.data});
			});
	}

	private loadMatchSet = (matchSetId: string) => {
		MatchSetRepository.fetch(matchSetId, this.context.httpClient)
			.then((response: Response<MatchSet>) => {
				this.setState({matchSet: response.data});
			});
	};

	private saveBets = (bets: Bet[]) => {
		const client: Client = this.context.httpClient;
		client.request({url: "/games/" + this.props.gameId + "/bets", method: "PUT", data: bets})
			.then((response: Response<Bet[]>) => {
				this.setState({bets: response.data});
				this.props.onNotification("Zapisano");
			});
	}
}

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return {
		onNotification: (message: string) => {
			dispatch(SnackbarActions.message(message));
		}
	};
}

export const GameView = connect(mapStateToProps, mapDispatchToProps)(GameViewRaw);

interface State {
	game?: Game;
	matchSet?: MatchSet;
	bets?: Bet[];
	ranking?: Ranking;
}
