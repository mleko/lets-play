import * as React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {Invitation as Component} from "../component/Invitation";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {GameInvitation} from "../model/models";
import {AppState} from "../redux";

export interface GameViewProps {
	invitationId: string;
}

type CombinedProps = GameViewProps & {
	authenticated: boolean;
};

class InvitationRaw extends React.PureComponent<CombinedProps, State> {

	public static contextTypes = httpContextValidationMap;

	public constructor(props: CombinedProps) {
		super(props);
		this.state = {
			accepted: false,
			notFound: false
		};
	}

	public render(): JSX.Element {
		if (this.props.authenticated) {
			return (
				<Component
					invitation={this.state.invitation}
					accepted={this.state.accepted}
					notFound={this.state.notFound}
					onAccept={this.accept}
					onReject={this.reject}
				/>
			);
		}
		sessionStorage.setItem("invitation", this.props.invitationId);
		return (<Redirect to={"/login"}/>);
	}

	public componentWillMount() {
		const client: Client = this.context.httpClient;
		return client.request({url: "/invitation/" + this.props.invitationId, method: "GET"})
			.then((response: Response<GameInvitation>) => {
				this.setState({invitation: response.data});
			})
			.catch(() => {
				this.setState({notFound: true});
			});
	}

	private accept = (invitationId: string) => {
		const client: Client = this.context.httpClient;
		client.request({url: "/invitation/" + invitationId + "/accept", method: "POST"})
			.then(() => {
				this.setState({accepted: true});
			});
	};
	private reject = (invitationId: string) => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/invitation/" + invitationId, method: "DELETE"})
			.then((response: Response<GameInvitation>) => {
				this.setState({invitation: response.data});
			});
	}
}

function mapStateToProps(state: AppState) {
	return {
		authenticated: state.auth.established ? null !== state.auth.user : null
	};
}

export const Invitation = connect(mapStateToProps)(InvitationRaw);

interface State {
	invitation?: GameInvitation;
	accepted?: boolean;
	notFound: boolean;
}
