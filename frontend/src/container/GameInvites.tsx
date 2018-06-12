import * as React from "react";
import {connect} from "react-redux";
import {GameInvites as Component} from "../component/GameView/GameInvites";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {GameInvite} from "../model/models";
import {Dispatch} from "../redux/Action";
import {SnackbarActions} from "../redux/module/snackbar";

export interface GameInvitesProps {
	gameId: string;
}

type CombinedProps = GameInvitesProps & { onNotification: (message: string) => any };

class GameInvitesRaw extends React.PureComponent<CombinedProps, State> {

	public static contextTypes = httpContextValidationMap;

	public constructor(props: CombinedProps) {
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
				if (!email) {
					this.setState({invitation: response.data});
				} else {
					this.props.onNotification("Wysłano zaproszenie");
				}
			});
	};
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

export const GameInvites = connect(mapStateToProps, mapDispatchToProps)(GameInvitesRaw);

interface State {
	invitation?: GameInvite;
}
