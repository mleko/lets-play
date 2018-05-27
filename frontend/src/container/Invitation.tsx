import * as React from "react";
import {Invitation as Component} from "../component/Invitation";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {GameInvitation} from "../model/models";

export interface GameViewProps {
	invitationId: string;
}

export class Invitation extends React.PureComponent<GameViewProps, State> {

	protected static contextTypes = httpContextValidationMap;

	public constructor(props: GameViewProps) {
		super(props);
		this.state = {};
	}

	public render(): JSX.Element {
		return (
			<Component
				invitation={this.state.invitation}
				onAccept={this.accept}
				onReject={this.reject}
			/>
		);
	}

	public componentWillMount() {
		const client: Client = this.context.httpClient;
		return client.request({url: "/invitation/" + this.props.invitationId, method: "GET"})
			.then((response: Response<GameInvitation>) => {
				this.setState({invitation: response.data});
			});
	}

	private accept = (invitationId: string) => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/invitation/" + invitationId, method: "DELETE"})
			.then((response: Response<GameInvitation>) => {
				this.setState({invitation: response.data});
				return null;
			});
	};
	private reject = (invitationId: string) => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/invitation/" + invitationId, method: "DELETE"})
			.then((response: Response<GameInvitation>) => {
				this.setState({invitation: response.data});
				return null;
			});
	}
}

interface State {
	invitation?: GameInvitation;
}
