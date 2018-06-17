import * as React from "react";
import {MatchBetsDialog as Component} from "../component/GameView/MatchBetsDialog";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {Bet, User} from "../model/models";

export interface UserBetsDialogProps {
	gameId: string;
	matchId: string;
	title: string;
	onClose: () => any;
}

export class MatchBetsDialog extends React.PureComponent<UserBetsDialogProps, State> {

	protected static contextTypes = httpContextValidationMap;

	public constructor(props: UserBetsDialogProps) {
		super(props);
		this.state = {
			bets: null,
			users: null
		};
	}

	public render(): JSX.Element {
		return (
			<Component
				users={this.state.users}
				bets={this.state.bets}
				title={this.props.title}
				onClose={this.props.onClose}
			/>
		);
	}

	public componentDidMount() {
		const client: Client = this.context.httpClient;
		client.request(
			{
				url: "/games/" + this.props.gameId + "/match-bets/" + this.props.matchId,
				method: "GET",
				queryData: {include_points: "true"}
			})
			.then((response: Response<Bet[]>) => {
				this.setState({bets: response.data});
			});
		client.request({url: "/games/" + this.props.gameId + "/users", method: "GET"})
			.then((response: Response<User[]>) => {
				this.setState({users: response.data});
			});
	}

}

interface State {
	bets?: Bet[];
	users?: User[];
}
