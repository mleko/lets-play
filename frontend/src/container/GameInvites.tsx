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
		this.state = {};
	}

	public render(): JSX.Element {
		return (
			<Component
				invitation={this.state.invitation}
				onInvite={this.invite}
			/>
		);
	}

	private invite = (email: string) => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/games/" + this.props.gameId + "/invites", method: "POST", data: {email}})
			.then((response: Response<GameInvite>) => {
				if (!email)
					this.setState({invitation: response.data});
			});
	};
}

interface State {
	invitation?: GameInvite;
}
