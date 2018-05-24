import * as React from "react";
import {GameInvites as Component} from "../component/GameView/GameInvites";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {GameInvite} from "../model/models";

export interface GameViewProps {
	gameId: string;
}

export class GameInvites extends React.PureComponent<GameViewProps, State> {

	protected static contextTypes = httpContextValidationMap;

	public constructor(props: GameViewProps) {
		super(props);
		this.state = {
			invites: []
		};
	}

	public render(): JSX.Element {
		return (
			<Component
				invites={this.state.invites}
				onInvite={this.invite}
				onInviteCancel={this.cancelInvite}
			/>
		);
	}

	public componentDidMount() {
		const client: Client = this.context.httpClient;
		client.request({url: "/games/" + this.props.gameId + "/invites", method: "GET"})
			.then((response: Response<GameInvite[]>) => {
				this.updateState(response.data);
			});
	}

	private invite = (email: string) => {
		const client: Client = this.context.httpClient;
		client.request({url: "/games/" + this.props.gameId + "/invites", method: "POST", data: {email}})
			.then((response: Response<GameInvite[]>) => {
				this.updateState(response.data);
			});
	};

	private updateState(invites: GameInvite[]) {
		this.setState({
			invites: invites.map((i: GameInvite) => {
				return i.email;
			})
		});
	}

	private cancelInvite = (email: string) => {
		const client: Client = this.context.httpClient;
		client.request({url: "/games/" + this.props.gameId + "/invites", method: "DELETE", data: {email}})
			.then((response: Response<GameInvite[]>) => {
				this.updateState(response.data);
			});
	}
}

interface State {
	invites: string[];
}
