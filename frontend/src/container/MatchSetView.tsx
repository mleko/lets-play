import * as React from "react";
import {MatchSetView as Component} from "../component/MatchSetView";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {MatchSet} from "../model/models";

export interface MatchSetViewProps {
	matchId?: string;
}

export class MatchSetView extends React.PureComponent<MatchSetViewProps, {}> {

	protected static contextTypes = httpContextValidationMap;

	public render(): JSX.Element {
		return (
			<Component
				matchId={this.props.matchId}
				loadMatchSet={this.loadMatchSet}
				onSave={this.saveMatchSet}
			/>
		);
	}

	private loadMatchSet = (matchId: string): Promise<MatchSet> => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/match-sets/" + matchId, method: "GET"})
			.then((response: Response<MatchSet>) => {
				return response.data;
			});
	};
	private saveMatchSet = (set: MatchSet) => {
		const client: Client = this.context.httpClient;
		if (set.id) {
			client.request({url: "/match-sets/" + set.id, method: "PUT", data: set});
		} else {
			client.request({url: "/match-sets", method: "POST", data: set});
		}
	};
}
