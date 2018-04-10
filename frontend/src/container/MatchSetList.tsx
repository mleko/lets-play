import * as React from "react";
import {MatchSetList as Component} from "../component/MatchSetList";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {MatchSet} from "../model/models";

export class MatchSetList extends React.PureComponent<{}, {}> {

	protected static contextTypes = httpContextValidationMap;

	public render(): JSX.Element {
		return (
			<Component
				loadSets={this.loadSets}
			/>
		);
	}

	private loadSets = (): Promise<MatchSet[]> => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/match-sets", method: "GET"})
			.then((response: Response<MatchSet[]>) => {
				return response.data;
			});
	};
}
