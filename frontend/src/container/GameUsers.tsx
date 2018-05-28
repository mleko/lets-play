import * as React from "react";
import {GameUsers as Component} from "../component/GameView/GameUsers";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {User} from "../model/models";

export interface GameViewProps {
	gameId: string;
}

export class GameUsers extends React.PureComponent<GameViewProps, State> {

	protected static contextTypes = httpContextValidationMap;

	public constructor(props: GameViewProps) {
		super(props);
		this.state = {
			users: []
		};
	}

	public render(): JSX.Element {
		return (
			<Component
				users={this.state.users}
			/>
		);
	}

	public componentDidMount() {
		const client: Client = this.context.httpClient;
		return client.request({url: "/games/" + this.props.gameId + "/users", method: "GET"})
			.then((response: Response<User[]>) => {
				this.setState({users: response.data});
			});
	}
}

interface State {
	users: User[];
}
