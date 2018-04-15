import * as React from "react";
import {GameList as Component} from "../component/GameList";
import {Client} from "../infrastructure/http/Client";
import {httpContextValidationMap} from "../infrastructure/http/Provider";
import {Response} from "../infrastructure/http/Response";
import {Game, MatchSet} from "../model/models";

export class GameList extends React.PureComponent<{}, {}> {

	protected static contextTypes = httpContextValidationMap;

	public render(): JSX.Element {
		return (
			<Component
				loadGames={this.loadGames}
				loadSets={this.loadSets}
				createGame={this.createGame}
			/>
		);
	}

	private loadGames = (): Promise<Game[]> => {
		// const client: Client = this.context.httpClient;
		return new Promise<Game[]>((resolve, reject) => {
			resolve([]);
		});
		// return client.request({url: "/match-sets", method: "GET"})
		// 	.then((response: Response<MatchSet[]>) => {
		// 		return response.data;
		// 	});
	};
	private loadSets = (): Promise<MatchSet[]> => {
		const client: Client = this.context.httpClient;

		return client.request({url: "/match-sets", method: "GET"})
			.then((response: Response<MatchSet[]>) => {
				return response.data;
			});
	};

	private createGame = (matchSetId: string, name: string): Promise<Game> => {
		const client: Client = this.context.httpClient;
		return client.request({url: "/games", method: "POST", data: {matchSetId, name}})
			.then((response: Response<Game>) => {
				return response.data;
			});
	}
}
