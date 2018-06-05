import * as React from "react";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {shallowMerge} from "typescript-object-utils";
import {MatchSetView as Component} from "../component/MatchSetView";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {MatchSet, MatchSetRepository} from "../model/MatchSet";
import {User} from "../model/models";
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
		MatchSetRepository.fetch(setId, this.context.httpClient)
			.then((response: Response<MatchSet>) => {
				this.setState({set: response.data});
			});
	};
	private updateSet = (set: MatchSet) => {
		this.setState({set: shallowMerge(this.state.set, set)});
	};
	private saveMatchSet = () => {
		const result = MatchSetRepository.save(this.state.set, this.context.httpClient);
		const set = this.state.set;
		if (!set.id) {
			result.then((response: Response<MatchSet>) => {
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
