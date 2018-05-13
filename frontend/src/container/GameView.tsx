import * as React from "react";
import {GameView as Component} from "../component/GameView";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {Game} from "../model/models";

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
			/>
		);
	}

	public componentDidMount() {
		const client: Client = this.context.httpClient;
		return client.request({url: "/games/" + this.props.gameId, method: "GET"})
			.then((response: Response<Game>) => {
				return response.data;
			})
			.then((game: Game) => {
				this.setState({game});
			});
	}
}

interface State {
	game?: Game;
}
