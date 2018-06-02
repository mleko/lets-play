import * as React from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {merge, shallowMerge} from "typescript-object-utils";
import {MatchSetView as Component} from "../component/MatchSetView";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {Match, MatchSet, User} from "../model/models";
import {AppState} from "../redux";
import {Dispatch} from "../redux/Action";
import {RoutingActions} from "../redux/module/routing";

export interface MatchSetViewProps {
	setId?: string;
}

interface MatchSetViewActions {
	onRedirect: (url: string) => any;
}

type CombinedProps = MatchSetViewProps & { user: User } & MatchSetViewActions;

class MatchSetViewWithRouter extends React.PureComponent<CombinedProps, State> {

	public static contextTypes = httpContextValidationMap;

	public constructor(props: CombinedProps) {
		super(props);
		this.state = {
			set: {
				id: "",
				name: "",
				matches: [],
				ownerId: ""
			}
		};
	}

	public render(): JSX.Element {
		const editable = !this.props.setId || (this.state.set && this.props.user && this.state.set.ownerId === this.props.user.id);
		return (
			<Component
				set={this.state.set}
				user={this.props.user}
				onUpdate={editable ? this.updateSet : undefined}
				onSave={editable ? this.saveMatchSet : undefined}
			/>
		);
	}

	public componentWillMount() {
		if (this.props.setId) {
			this.loadMatchSet(this.props.setId);
		}
	}

	private loadMatchSet = (setId: string): void => {
		const client: Client = this.context.httpClient;
		client.request({url: "/match-sets/" + setId, method: "GET"})
			.then((response: Response<MatchSet>) => {
				const set = response.data;
				this.setState({
					set: merge(set, {
						matches: set.matches.map((m: Match) => {
							return merge(m, {startDate: m.startDate.substr(0, m.startDate.length - 9)});
						})
					})
				});
			});
	};
	private updateSet = (set: MatchSet) => {
		this.setState({set: shallowMerge(this.state.set, set)});
	};
	private saveMatchSet = () => {
		const client: Client = this.context.httpClient;
		const set = this.state.set;
		if (set.id) {
			client.request({url: "/match-sets/" + set.id, method: "PUT", data: set});
		} else {
			client
				.request({url: "/match-sets", method: "POST", data: set})
				.then((response: Response<MatchSet>) => {
					this.setState({set: response.data});
					this.props.onRedirect("/match-sets/" + response.data.id);
				});
		}
	};
}

interface State {
	set?: MatchSet;
}

function mapStateToProps(state: AppState) {
	return {
		user: state.auth.user ? state.auth.user : null
	};
}
function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		onRedirect: RoutingActions.redirect,
	}, dispatch);
}

export const MatchSetView = connect(mapStateToProps, mapDispatchToProps)(MatchSetViewWithRouter);
